const express = require("express");

// Routes

const app = express();

app.use(express.json({ limit: "50kb" }));

module.exports = app;