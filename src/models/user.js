const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Gender data is not valid');
        }
      },
    },
    photourl: {
      type: String,
      default:
        'https://images.pexels.com/photos/8081419/pexels-photo-8081419.jpeg',
    },
    about: {
      type: String,
      default: 'This is a default about the user!',
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
