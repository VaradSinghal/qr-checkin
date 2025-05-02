const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { viewAttendees, checkInUser } = require("../controllers/adminController");

router.get("/attendees/:eventId", auth, role("admin"), viewAttendees);
router.post("/checkin", auth, role("admin"), checkInUser);

module.exports = router;
