const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');
// require('dotenv').config();



router.use(fileupload({
    useTempFiles: true
}));

router.post('/upload', (req, res) => {
    const file = req.files.photo;
    console.log(file);
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
