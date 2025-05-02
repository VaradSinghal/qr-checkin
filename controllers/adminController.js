const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

exports.viewAttendees = async (req, res) => {
  const { eventId } = req.params;
  const list = await Registration.find({ event: eventId }).populate("user");
  res.json(list);
};

exports.checkInUser = async (req, res) => {
  const { qrData } = req.body;
  const reg = await Registration.findOne({ qrData });
  if (!reg) return res.status(404).json({ error: "Invalid QR" });
  if (reg.checkedIn) return res.json({ message: "Already checked-in" });

  reg.checkedIn = true;
  await reg.save();
  res.json({ message: "Checked-in" });
};
