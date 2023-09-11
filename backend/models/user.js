const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
  },
  phoneNumbeer: {
    type: Number,
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordTime: Date
});

// hash password before saving for new users
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwortd')) {
    next()
  
    this.password = bcrypt.hash(this.password, 10);
  }
});

// generate token to be used as cookies
userSchema.methodsgetJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {expiresIn: '5d',});
}

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
