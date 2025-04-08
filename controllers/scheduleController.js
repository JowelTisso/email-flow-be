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
    const emailNodes = nodes.filter((node) => node.type === "email");
    const followUpNodes = emailNodes.filter((node) => !!node.data.followUp);

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

    if (followUpNodes.length > 0) {
      followUpNodes.forEach((node) => {
        const body = node.data.value.body;
        const subject = node.data.value.subject;
        initiateMailSender(email, body, subject);
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
