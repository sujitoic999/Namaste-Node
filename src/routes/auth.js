const express = require('express');
const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();

//Sign up api
authRouter.post('/signup', async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send('User Added successfully!');
  } catch (err) {
    res.status(400).send('ERROR :' + err.message);
  }
});
//login api
authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      console.log(token);
      // Add the token to cookie and send the response back to the user
      res.cookie('token', token, {
        maxAge: 8 * 60 * 60 * 1000,
      });
      res.send('Login Successful!!!');
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

module.exports = authRouter;
