const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  perjalananDinasControllers,
} = require("../controllers/perjalananDinasController");

router.post(
  "/check-invoice",
  authenticateToken,
  asyncHandler(perjalananDinasControllers)
);

module.exports = router;
