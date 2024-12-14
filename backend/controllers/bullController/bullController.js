const { ExpressAdapter } = require("@bull-board/express");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { createBullBoard } = require("@bull-board/api");
const generalLedgerQueue = require("../generalLedgerController/jobs/generalLedgerJob");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/api/admin/bull-queues");

createBullBoard({
  queues: [new BullAdapter(generalLedgerQueue)],
  serverAdapter: serverAdapter,
});

module.exports = serverAdapter;
