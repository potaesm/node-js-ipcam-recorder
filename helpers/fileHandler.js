const fs = require("fs");
const rimraf = require("rimraf");
const du = require("du");
const findRemoveSync = require("find-remove");

const FileHandler = class {
  createDirIfNotExists(folderPath) {
    try {
      if (!fs.lstatSync(folderPath).isDirectory()) {
        fs.mkdirSync(folderPath, { recursive: true }, (_err) => {});
      }
    } catch (e) {
      fs.mkdirSync(folderPath, { recursive: true }, (_err) => {});
    }
  }

  removeDirectory(folderPath, callback) {
    rimraf(folderPath, callback);
  }

  removeOlder(folderPath, ageSeconds, extensions = [".mp4"], limit = 100) {
    return findRemoveSync(folderPath, {
      age: { seconds: ageSeconds },
      extensions,
      limit,
    });
  }

  getDirectorySize(folderPath, callback) {
    du(folderPath, (err, size) => {
      callback(err, size);
    });
  }
};

module.exports = FileHandler;
