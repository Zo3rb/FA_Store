const express = require("express");
const path = require('path');
const upload = require('../multer');
const Shop = require('../models/shop');
const fs = require('fs');
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendMail');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const sendToken = require('../utils/jwtToken');
const isSeller = require('../middleware/auth');
const sendShopToken = require("../utils/shopToken");

router.post('/create-shop', upload.single('file'), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `./uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error deleting file');
        }
      });
      return next(new ErrorHandler('User already exists', 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode
    };
    console.log(seller);

    const activationToken = createActivationToken(seller);

    const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;

    try {
      sendMail({
        email: seller.email,
        subject: 'Activate your shop',
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({ success: true, message: `Please check your email ${seller.email} to activate your shop` });
    } catch (err) {
      next(new ErrorHandler(err.message, 500));
    }

    // const newUser = await User.create(user);
    //   return res.status(201).json({ success: true, newUser });

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// activate shop account

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      console.log(newSeller);

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login seller
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
         sendToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load seller
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
