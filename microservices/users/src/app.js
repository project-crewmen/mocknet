const express = require("express");

// Routes
const userRouter = require("./routes/userRoutes");
const statRouter = require("./routes/statRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/user", userRouter);
app.use("/stats", statRouter);

module.exports = app;