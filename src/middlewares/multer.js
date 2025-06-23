const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');

const allowedImageTypes = /jpeg|jpg|png|webp|gif/;

const createUploadDirectories = () => {
  const baseUploadPath = path.join(__dirname, '../uploads');
  const subDirectories = ['team', 'feature'];

  if (!fs.existsSync(baseUploadPath)) {
    fs.mkdirSync(baseUploadPath, { recursive: true });
  }

  subDirectories.forEach((dir) => {
    const dirPath = path.join(baseUploadPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
};

createUploadDirectories();

const createStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = path.join(__dirname, `../uploads/${folder}`);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = file.originalname.replace(ext, '').replace(/\s+/g, '-');
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  });

const fileFilter = (req, file, cb) => {
  const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedImageTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new ApiError(status.BAD_REQUEST, 'Only image files (jpeg, png, webp, gif) are allowed.'));
  }
};

// File size limit (2MB)
const limits = { fileSize: 2 * 1024 * 1024 };

const createUploader = (folder) =>
  multer({
    storage: createStorage(folder),
    fileFilter,
    limits
  });

module.exports = {
  uploadSingleImage: (folder) => createUploader(folder).single('image'),
  uploadMultipleImages: (folder) => createUploader(folder).array('images', 10)
};
