const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  UploadImageController,
} = require("../controllers/imageController/uploadController");
const {
  viewImageController,
} = require("../controllers/imageController/viewController");

router.post(
  "/upload-image",
  authenticateToken,
  asyncHandler(UploadImageController)
);

router.post(
  "/detail",
  // authenticateToken,
  asyncHandler(viewImageController)
);

router.use("/view-images", express.static("upload-images"));

module.exports = router;
