const express = require("express");

// Routes
const linkRoutes = require("./routes/linkRoutes");
const machineRoutes = require("./routes/machineRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/sdc/link", linkRoutes);
app.use("/sdc/machine", machineRoutes);

module.exports = app;