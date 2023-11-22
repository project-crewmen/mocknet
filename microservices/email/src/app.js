const express = require("express");

// Routes
const emailRouter = require("./routes/emailRoutes");
const statRouter = require("./routes/statRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/email", emailRouter);
app.use("/stats", statRouter);

module.exports = app;