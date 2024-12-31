const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UPLOADS_FOLDER = path.join(__dirname, '../uploads');

// Define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // Limit file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'photos') {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Only JPG, JPEG, PNG allowed'), false);
      }
    } else if (file.fieldname === 'doc') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files allowed'), false);
      }
    } else {
      cb(new Error('Unknown field'), false);
    }
  },
});
module.exports = upload;
