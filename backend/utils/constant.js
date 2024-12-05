const path = require("path");
const fs = require("fs");
require("dotenv").config();

const storagePath = path.resolve(process.env.STORAGE_PATH_DEV);

function ensureDirectoryExists(directoryPath = storagePath, folderName) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

module.exports = {
  ensureDirectoryExists,
  storagePath,
};
