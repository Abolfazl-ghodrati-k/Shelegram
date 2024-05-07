const express = require("express");
const { rateLimiter } = require("../controllers/rateLimiter");
const { handleUpdateProfile } = require("../controllers/profileController")

const router = express.Router();

router.post("/update", rateLimiter(30, 4), handleUpdateProfile)

module.exports = router;
