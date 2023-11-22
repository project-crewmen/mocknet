const express = require("express");

// Routes
const inventoryRouter = require("./routes/inventoryRoutes");
const statRouter = require("./routes/statRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/inventory", inventoryRouter);
app.use("/stats", statRouter);

module.exports = app;