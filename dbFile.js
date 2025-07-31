const mongoose = require("mongoose");


const connectDB = async () => {
  const MONGO_URI = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@nodetask.gihpvnv.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;

  try {
    // console.log(MONGO_URI)
    const conn = await mongoose.connect(MONGO_URI, {});
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

  module.exports = connectDB