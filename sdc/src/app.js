const express = require("express");
const cors = require("cors");

// Configs
const corsOptions = require("./config/corsOptions")

// Routes
const linkRoutes = require("./routes/linkRoutes");
const machineRoutes = require("./routes/machineRoutes");
const networkRoutes = require("./routes/networkRoutes");

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: "50kb" }));

app.use("/sdc/link", linkRoutes);
app.use("/sdc/machine", machineRoutes);
app.use("/sdc/network", networkRoutes);

module.exports = app;