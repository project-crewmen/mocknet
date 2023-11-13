const express = require("express");

const router = express.Router();

const monitorController = require("../controllers/monitorController");

router.get("/stats", monitorController.getStats);

module.exports = router;