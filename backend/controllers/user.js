const express = require("express");
const path = require('path');
const upload = require('../multer');
const User = require('../models/user');
const fs = require('fs');
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendMail');

const router = express.Router();

router.post('/create-user', upload.single('file'), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `./uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting file');
        
      }
    });

    return next(new ErrorHandler('User already exist', 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name,
    email,
    password,
    avatar: fileUrl
  };

  const ativationToken = createActivationToken(user);

  const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationUrl}`;

  try {
    sendMail({
      email: user.email,
      subject: 'activate your account',
      message: `Hello ${user.name} please click on the link to activate your account: ${activationUrl}`,
    })
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }

  const newuser = await User.create(user);
  res.status(201).json({ succes: true, newuser });

});

function createActivationToken(user) {

  const activationUrl = `${process.env.FRONTEND_URL}/activation${activationToken}`;
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: '5m' });
}

module.exports = router;
