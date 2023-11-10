const app = require("./src/app");

const monitor = require("./src/monitor/monitor");

// RUNNING SERVER
const PORT = 1111;
const server = app.listen(PORT, () => {
  console.log(`✔️  App running on port ${PORT}`);
});

// Mock routines
monitor.monitor()

// CAUGHT UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💣: Server Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});