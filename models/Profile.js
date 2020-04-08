const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  bio: {
    type: String
  },
  birthday: {
    type: Date
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
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
