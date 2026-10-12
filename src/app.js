const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req, res) => {
  //creating a new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send('User Added successfully!');
  } catch (err) {
    res.status(400).send('Error saving the user:' + err.message);
  }
});

//getting a single user with email id
app.get('/user', async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
});

//getting user feed -> get all the users from data base
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
});

//deleting a user from DB
app.delete('/user', async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send('User deleted successfully');
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
});

//Update data of a user
app.patch('/user/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error('Update not allowed');
    }
    if (data?.skills.length > 10) {
      throw new Error('Skills can not be more than 10');
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send('User updated successfully');
  } catch (err) {
    res.status(400).send('UPDATE FAILED:' + err.message);
  }
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
