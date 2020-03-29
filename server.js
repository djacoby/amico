const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');

//Connect to the database
connectDB();

// Built in Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
