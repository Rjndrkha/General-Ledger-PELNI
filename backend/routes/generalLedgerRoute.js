const express = require("express");
const router = express.Router();
const {
  authentificationController,
} = require("../controllers/authentificationController/authentificationController");
const { authenticateToken } = require("../middleware/middleware");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  generalLedgerControllers,
  generalLedgerStatusControllers,
} = require("../controllers/generalLedgerController/generalLedgerController");
const generalLedgerDownload = require("../controllers/generalLedgerController/downloadController");

router.post(
  "/request-gl",
  authenticateToken,
  asyncHandler(generalLedgerControllers)
);

router.get(
  "/download/:jobId",
  authenticateToken,
  asyncHandler(generalLedgerDownload)
);

router.get(
  "/check-status",
  authenticateToken,
  asyncHandler(generalLedgerStatusControllers)
);

module.exports = router;
