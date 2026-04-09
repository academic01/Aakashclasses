const cloudinary = require('../config/cloudinary');

const uploadController = {
  // Generic Media Upload (Images/Thumbnails/PDFs)
  uploadMedia: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      let folder = 'aakash_general';
      const fileType = req.file.mimetype;
      if (fileType.includes('video')) folder = 'aakash_videos';
      else if (fileType.includes('image')) folder = 'aakash_images';
      else if (fileType.includes('pdf')) folder = 'aakash_notes';

      // Convert buffer to base64 DataURI
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: folder,
        resource_type: 'auto'
      });

      res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        format: result.format
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = uploadController;
