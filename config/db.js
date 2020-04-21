const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Function using mongoose to connect to MongoDB server via provided URI
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);

    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
