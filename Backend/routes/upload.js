// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const router = express.Router();

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer Storage for Cloudinary (Supports PNG & PDF)
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const format = file.mimetype === 'application/pdf' ? 'pdf' : 'png'; // Allow PNG & PDF
//     return {
//       folder: 'uploads', // Cloudinary folder
//       format: format, // Keep original format
//       public_id: file.originalname.split('.')[0], // Use file name as public_id
//     };
//   },
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/png', 'application/pdf'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PNG and PDF files are allowed'), false);
//     }
//   }
// });

// // Route to Upload File
// router.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }
//   res.json({
//     message: 'File uploaded successfully',
//     fileUrl: req.file.path, // Cloudinary file URL
//   });
// });

// module.exports = router; // ✅ Ensure this is properly exported
