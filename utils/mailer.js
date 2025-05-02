const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (to, qrImage, event) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `QR Code for ${event.title}`,
    html: `<p>Show this QR code at entry for ${event.title} on ${event.date}</p><img src="${qrImage}" />`,
  });
};
