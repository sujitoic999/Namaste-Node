const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://sujitfgiet_db_user:1tsppKV7jhl3sQRh@cluster0.w0ryyyp.mongodb.net/devTinder',
  );
};

module.exports = connectDB;
