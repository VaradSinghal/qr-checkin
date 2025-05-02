const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { createEvent, registerEvent } = require("../controllers/eventController");

router.post("/create", auth, role("admin"), createEvent);
router.post("/register", auth, registerEvent);

module.exports = router;
