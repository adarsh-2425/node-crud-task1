const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongoose connected to MONGODB Atlas');
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  };

module.exports = connectDB;
