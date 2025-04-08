const { Agenda } = require("@hokify/agenda");
const nodemailer = require("nodemailer");

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_EMAIL,
    pass: process.env.ETHEREAL_PASS,
  },
});

module.exports = { agenda, transporter };
