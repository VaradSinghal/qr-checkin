const Event = require("../models/Event");
const Registration = require("../models/Registration");
const QR = require("../utils/qr");
const sendEmail = require("../utils/mailer");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerEvent = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;
  try {
    const existing = await Registration.findOne({ user: userId, event: eventId });
    if (existing) return res.status(400).json({ error: "Already registered" });

    const qrData = `${userId}_${eventId}_${Date.now()}`;
    const qrImage = await QR.generateQR(qrData);

    const registration = await Registration.create({ user: userId, event: eventId, qrData });

    const user = req.userDetails;
    const event = await Event.findById(eventId);
    await sendEmail(user.email, qrImage, event);

    res.json({ message: "Registered and QR sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
