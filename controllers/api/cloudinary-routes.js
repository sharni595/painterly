const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');
// require('dotenv').config();



cloudinary.config({
    cloud_name: process.env.CC_NAME,
    api_key: process.env.CC_KEY,
    api_secret: process.env.CC_SECRET
  });
  

router.use(fileupload({
    useTempFiles: true
}));

router.post('/', (req, res) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.log('Cloudinary error: ' + err);
        }
        res.json({
            success: true,
            result
        })
    })
});

module.exports = router;
