const express = require("express");

// Routes
const orderRouter = require("./routes/orderRoutes");
const statRouter = require("./routes/statRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/order", orderRouter);
app.use("/stats", statRouter);

module.exports = app;