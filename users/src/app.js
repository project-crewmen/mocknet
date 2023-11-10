const express = require("express");

// Routes
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));

app.use("/user", userRouter);

module.exports = app;