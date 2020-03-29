const mongoose = require("mongoose");
const config = require("config");
const mongodbKey = config.get("key");
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbKey, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("mongodb connected succesfully");
  } catch (error) {
    console.log("unable to connect", error.message);
  }
};

module.exports = connectDB;
