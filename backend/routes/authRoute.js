const express = require("express");
const router = express.Router();
const {
  authentificationController,
} = require("../controllers/authentificationController/authentificationController");
const { authenticateToken } = require("../middleware/middleware");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  getUserMenuController,
} = require("../controllers/menuController/getUserMenuController");
const {
  addMasterMenuController,
} = require("../controllers/menuController/addMasterMenuController");

router.post("/login", asyncHandler(authentificationController));
router.get(
  "/usermenu-access",
  authenticateToken,
  asyncHandler(getUserMenuController)
);
router.post(
  "/add/master-menu",
  authenticateToken,
  asyncHandler(addMasterMenuController)
);

module.exports = router;
