const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  age: {
    type: Number
  }
  // avatar: {
  //     imageName: {
  //         type: String,
  //         default: "none",
  //         required: true
  //     },
  //     imageData: {
  //         type: String,
  //         required: true
  //     }
  // }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
