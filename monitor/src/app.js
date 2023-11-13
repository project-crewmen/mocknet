const express = require("express");
const cors = require("cors");

// Configs
const corsOptions = require("./config/corsOptions")

// Routes
const monitorRoutes = require("./routes/monitorRoutes");

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: "50kb" }));

app.use("/monitor", monitorRoutes);

module.exports = app;