require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.URI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) return reject(err);

        const filename = buf.toString('hex') + path.extname(file.originalname);

        const fileInfo = { filename, bucketName: 'uploads' };
        
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

module.exports = upload;