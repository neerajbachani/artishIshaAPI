const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongodburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

module.exports = { connectDb }