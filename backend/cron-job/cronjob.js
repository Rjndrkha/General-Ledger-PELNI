const cleanOldFiles = require("../controllers/generalLedgerController/jobs/cleanGeneralLedger");
const cron = require("node-cron");

function initializeCronJobs() {
  // Jadwalkan pembersihan setiap hari pada jam 2 pagi
  cron.schedule("0 2 * * *", async () => {
    console.log("Memulai pembersihan file lama...");
    await cleanOldFiles();
    console.log("Pembersihan selesai.");
  });

  console.log("Cron jobs telah dijadwalkan.");
}

module.exports = initializeCronJobs;
