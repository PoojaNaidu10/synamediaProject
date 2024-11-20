'use strict';
const mongoose = require('mongoose');
const systemconfig = require('../systemgitconfig/systemconfig');

// Localhost settings
const config = {
  db: "synamedia",
  host: systemconfig.HOST,
  user: systemconfig.USER_NAME,
  pw: systemconfig.PASSWRORD,
  port: 27017
};

// Constructing the MongoDB URI
const port = config.port ? `:${config.port}` : '';
const login = config.user && config.pw ? `${config.user}:${config.pw}@` : '';
const uristring = `mongodb://${login}${config.host}${port}/${config.db}`;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to Database
console.log("MongoDB Connection URI: ", uristring);

// const connectDB = async () => {
//   try {
   mongoose.connect(uristring, mongoOptions);
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err.message);
//     process.exit(1); // Exit the process with failure
//   }
// };

module.exports = mongoose;
