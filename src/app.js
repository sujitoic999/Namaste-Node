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

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

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
