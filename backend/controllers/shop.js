const express = require("express");
const path = require('path');
const upload = require('../multer');
const shop = require('../models/shop');
const fs = require('fs');
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendMail');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const sendToken = require('../utils/jwtToken');
const isAuthenticated = require('../middleware/auth');

router.post('/create-shop', upload.single('file'), async (req, res, next) => {
    try {
        const {email} = req.body;
        const sellerEmail = await shop.findOne({email});
        if (sellerEmail) {
            const filename = req.file.filename;
            const filePath = `./uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error deleting file');
                }
            });
            return next(new ErrorHandler('Shop already exists', 400));
        }
    }catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});


module.exports = router;
