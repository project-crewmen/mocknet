const mongoose = require("mongoose");

const app = require("./src/app");
const mocker = require("./src/mock/mocker");

// DATABASE
const DATABASE_URI_LOCALHOST = "mongodb://root:password@localhost:27017";
const DATABASE_URI_DOCKER = "mongodb://root:password@mongo:27017";

const dbURI = process.env.ENV === "localhost" ? DATABASE_URI_LOCALHOST : DATABASE_URI_DOCKER

mongoose.connect(dbURI);

// Listen for the connection event
mongoose.connection.on('connected', () => {
  console.log("✔️ Database is connected successfully");

  // RUNNING SERVER
  const PORT = 5001;
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
});

// Listen for the error event
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// Listen for the disconnection event
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close Mongoose connection when the app is terminated
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
  });
});