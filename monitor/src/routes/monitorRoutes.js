const express = require("express");

const router = express.Router();

const monitorController = require("../controllers/monitorController");

router.get("/:from/:to", monitorController.calculateMessagePassed);

module.exports = router;