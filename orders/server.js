const app = require("./src/app");

const mocker = require("./src/mock/mocker");

// RUNNING SERVER
const PORT =  8081;
const server = app.listen(PORT, () => {
  console.log(`✔️  App running on port ${PORT}`);
});

// Mock routines
mocker.mock()

// CAUGHT UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💣: Server Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});