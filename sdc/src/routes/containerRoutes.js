const express = require("express");

const containerController = require("../controllers/containerController");

const router = express.Router({mergeParams: true});

// Container
router.get("/:containerName", containerController.getContainer);
router.get("/", containerController.getContainerList);
router.post("/start", containerController.startContainer);
// router.patch("/:containerName/stop", containerController.stopContainer);
// router.delete("/:containerName", containerController.removeContainer);

module.exports = router;