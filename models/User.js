const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
