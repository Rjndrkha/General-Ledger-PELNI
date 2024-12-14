const cluster = require("cluster");
const os = require("os");
const startApp = require("./index");

// Cluster setup
if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  console.log(`Running in ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  //   cluster.on("online", (worker) => {
  //     console.log(`Worker ${worker.process.pid} is online`);
  //   });

  //   cluster.on("disconnect", (worker) => {
  //     console.log(`Worker ${worker.process.pid} has disconnected`);
  //   });

  //   cluster.on("error", (worker, code, signal) => {
  //     console.log(`Worker ${worker.process.pid} has an error: ${code}`);
  //   });

  //   cluster.on("listening", (worker, address) => {
  //     console.log(
  //       `Worker ${worker.process.pid} is now connected to ${address.address}:${address.port}`
  //     );
  //   });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  startApp();
}
