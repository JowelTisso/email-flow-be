const { agenda, transporter } = require("../config/agenda");
const Node = require("../models/Node");
const Schedule = require("../models/Schedule");
const { v4: uuid } = require("uuid");

const initiateMailSender = async (
  email,
  subject,
  body,
  scheduleTime = "after 5 seconds"
) => {
  agenda.define("sendMail", async () => {
    const info = await transporter.sendMail({
      from: '"katelin Foo Koch 👻" <katelin.fritsch@ethereal.email>',
      to: email,
      subject: subject,
      text: body,
      html: `<b>${body}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
  });

  await agenda.start();

  await agenda.schedule(scheduleTime, "sendMail");
};

const saveSchedule = async (req, res) => {
  try {
    const { time, subject, body, email } = req.body;

    const nodes = await Node.find({});
    const followUpNodes = nodes.filter(
      (node) => !!node.data.followUp || node.type === "delay"
    );

    if (!time || !subject || !body || !email) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const id = uuid();

    const newSchedule = new Schedule({
      id,
      time,
      subject,
      body,
      email,
    });

    const savedSchedule = await newSchedule.save();

    initiateMailSender(email, subject, body);

    let waitTime = 0;
    let waitType = "minutes";

    if (followUpNodes.length > 0) {
      followUpNodes.forEach((node) => {
        if (node.type === "delay") {
          waitTime = node.data.waitTime;
          waitType = node.data.waitType;
        } else {
          const body = node.data.value.body;
          const subject = node.data.value.subject;
          const scheduleString = `After ${waitTime} ${waitType}`;
          initiateMailSender(email, body, subject, scheduleString);
        }
      });
    }

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save schedule" });
  }
};

module.exports = {
  saveSchedule,
};
