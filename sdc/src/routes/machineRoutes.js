const express = require("express");

const machineController = require("../controllers/machineController");

const containerRouter = require("./containerRoutes")

const router = express.Router();

// Nested Routing - Container
router.use("/:machineName/container", containerRouter);

// Machine
router.get("/:machineName", machineController.getMachine);

module.exports = router;