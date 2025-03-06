const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); 


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file)=>{
        return{
            folder:"Drive",
            allowed_formats:["jpg","png","jpeg","pdf"],
            public_id: `${file.originalname.split(".")[0]}_${Date.now()}`, 
            unique:true
        };
    },
});
const upload = multer({ storage});

module.exports = upload;
