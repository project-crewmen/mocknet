const express = require("express");

const linkController = require("../controllers/linkController");

const router = express.Router();

// Link
router.get("/:linkName", linkController.getLink);

module.exports = router;