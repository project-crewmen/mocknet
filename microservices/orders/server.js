const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = require("./src/app");
const mocker = require("./src/mock/mocker");
const sdcDeployer = require("./src/mock/sdcDeployer");

// DATABASE
const connectMongoDB = async () => {
  try {
    const DATABASE_URI_LOCALHOST = "mongodb://root:password@localhost:27017";
    const DATABASE_URI_DOCKER = "mongodb://root:password@mongo:27017";

    const dbURI = process.env.ENV === "localhost" ? DATABASE_URI_LOCALHOST : DATABASE_URI_DOCKER

    await mongoose.connect(dbURI);
  } catch (error) {
    console.log(error);
  }
}

connectMongoDB()

// Listen for the connection event
mongoose.connection.on('connected', async () => {
  console.log("✔️ Database is connected successfully");

  // RUNNING SERVER
  const PORT = process.env.PORT ? process.env.PORT : 5001;
  const server = app.listen(PORT, () => {
    console.log(`✔️  App running on port ${PORT}`);
  });

  const res = await sdcDeployer.sdcDeploy()

  // Mock routines
  if (res !== null) {
    mocker.mock()
  }

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