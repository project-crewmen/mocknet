const express = require("express");

// Routes
const orderRouter = require("./routes/orderRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/order", orderRouter);

module.exports = app;