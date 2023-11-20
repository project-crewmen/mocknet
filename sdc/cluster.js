const app = require("./src/app");
const runner = require("./src/run/runner");

// RUNNING SERVER
const PORT = 2222;
const cluster = app.listen(PORT, () => {
    console.log(`\n✔️  App running on port ${PORT}`);
});

runner.run()

// CAUGHT UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION 💣: Cluster Shutting down");
    console.log(err.name, err.message);
    cluster.close(() => {
        process.exit(1);
    });
});