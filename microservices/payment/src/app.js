const express = require("express");

// Routes
const paymentRouter = require("./routes/paymentRoutes");
const statRouter = require("./routes/statRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/payment", paymentRouter);
app.use("/stats", statRouter);

module.exports = app;