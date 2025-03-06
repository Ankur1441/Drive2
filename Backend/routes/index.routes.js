const express = require("express");
const cloudinary = require("cloudinary")
const authMiddleware = require("../middlewares/authe");
const router = express.Router();
const upload = require("../config/cloudinary.config");
const fileModel = require("../models/files.models");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

router.get('/home', authMiddleware, async(req,res) =>{
    // console.log(req.user)

    const userFiles = await fileModel.find({
        user: req.user.userId
    })

    console.log(userFiles)

    res.render('home',{
        files:userFiles
    });

});




router.post('/upload',authMiddleware, upload.single('file'), async (req, res) => {

    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname,
        user: req.user.userId

    })
    res.json(newFile)
});

router.get('/download', authMiddleware, async (req, res)=>{
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path: path
    })

    if(!file){
        return res.status(401).json({
            Message: "Unauthorized"
        })
    }

    // const signedUrl = await Cloudinary.storage.bucket().file(path).getSignedUrl({
    //     action:'read'
    // })

    res.json({ downloadUrl: file.path });
});

module.exports = router;