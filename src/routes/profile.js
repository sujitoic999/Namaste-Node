const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const { validateEditProfileData } = require('../utils/validation');

//get user profile detail
profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

//edit user profile details
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error('Invalid Edit Request');
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])); //here we are assigning body values to loggedIn values means we are replacing loggedIn user values with body data values(update is happening )
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

module.exports = profileRouter;
