const path = require("path");
const fs = require("fs");
require("dotenv").config();

const storagePath = path.resolve(process.env.STORAGE_PATH);

function ensureDirectoryExists(directoryPath = storagePath, folderName) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function ensureDirectoryExists(basePath = storagePath, subFolder = "") {
  const targetPath = path.join(basePath, subFolder);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log(`Folder baru berhasil dibuat: ${targetPath}`);
  }

  return targetPath;
}

module.exports = {
  ensureDirectoryExists,
  storagePath,
};
