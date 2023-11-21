const app = require("./src/app");
const { run } = require("./src/sdhw/runner");

// RUNNING SERVER
const PORT = 2222;
const cluster = app.listen(PORT, () => {
    console.log(`\n✔️  App running on port ${PORT}`);
});

run()

// CAUGHT UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION 💣: Cluster Shutting down");
    console.log(err.name, err.message);
    cluster.close(() => {
        process.exit(1);
    });
});