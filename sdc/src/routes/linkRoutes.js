const express = require("express");

const linkController = require("../controllers/linkController");

const router = express.Router();

// Link
router.get("/:linkName", linkController.getLink);
router.get("/", linkController.getLinkList);

module.exports = router;