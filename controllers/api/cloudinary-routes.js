const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
})