const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

//Sign Up API
app.post('/signup', async (req, res) => {
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

//Login api
app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder$790', {
        expiresIn: '1d',
      });
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
//get user profile detail
app.get('/profile', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log('Sending a connection request');
  res.send(user.firstName + ' sent the connection request!');
});

connectDB()
  .then(() => {
    console.log('Database connection established');
    app.listen(3000, () => {
      console.log('Server is successfully listening in port 3000.');
    });
  })
  .catch((err) => {
    console.log('there is some issues in data base connection');
  });
