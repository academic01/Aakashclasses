const multer = require('multer');

// Store file in memory to pipe to cloudinary stream
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for general uploads (videos usually need larger limits or direct chunked uploads from frontend)
  },
  fileFilter: (req, file, cb) => {
    // Only accept images or pdf or mp4 explicitly if needed, but let's allow all safely
    const ext = file.originalname.split('.').pop().toLowerCase();
    const allowed = ['jpg','jpeg','png','webp','mp4','mkv','pdf'];
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

module.exports = upload;
