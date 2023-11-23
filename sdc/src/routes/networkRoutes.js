const express = require("express");

const networkController = require("../controllers/networkController");

const router = express.Router();

// Link
router.get("/:src/:dest", networkController.getLinkForMachines);

module.exports = router;