const express = require("express");

const router = express.Router();

const monitorController = require("../controllers/monitorController");

router.get("/affinity/:src/:dest", monitorController.getAffinity);
router.get("/affinity/", monitorController.getAffinityList);
router.get("/affinityFactor/:src/:dest", monitorController.getAffinityFactor);
router.get("/affinityFactor/", monitorController.getAffinityFactorList);
router.get("/affinityCost/:src/:dest", monitorController.getAffinityCost);
router.get("/affinityCost/", monitorController.getAffinityCostList);

module.exports = router;