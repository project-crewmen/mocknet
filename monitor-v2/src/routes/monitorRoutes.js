const express = require("express");

const router = express.Router();

const monitorController = require("../controllers/monitorController");

router.get("/:src/:dest", monitorController.getAffinity);
router.get("/", monitorController.getAffinityList);

module.exports = router;