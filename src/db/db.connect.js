import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    console.log("Attemting to connect to DB.........");
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/urlShortner";
    await mongoose.connect(mongoUri);
    console.log("Connected to DB")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};
export default connectToDb