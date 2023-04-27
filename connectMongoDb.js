import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn =    process.env.MONGODB_CONNECTION_URL  ||  "mongodb+srv://admin:admin@cluster0.gygecir.mongodb.net/test"
    console.log(process.env.MONGODB_CONNECTION_URL)
    const conn = await mongoose.connect("mongodb+srv://admin:admin@cluster0.gygecir.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
