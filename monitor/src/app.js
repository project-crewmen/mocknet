const express = require("express");

// Routes
const monitorRoutes = require("./routes/monitorRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/monitor", monitorRoutes);

module.exports = app;