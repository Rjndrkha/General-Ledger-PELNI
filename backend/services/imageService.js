const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ensureDirectoryExists, storagePath } = require("../utils/constant");
require("dotenv").config();

// const storagePath = path.resolve(process.env.STORAGE_PATH_DEV);

// if (!fs.existsSync(storagePath)) {
//   fs.mkdirSync(storagePath, { recursive: true });
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = ensureDirectoryExists(storagePath, "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const trimmedName = file.originalname.replace(/ /g, "-");
    const uniqueName = `${Date.now()}-${trimmedName}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter,
});

module.exports = { upload };
