import express from "express";
import cors from "cors";
import {config} from "dotenv";
import path from 'path';
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import paymentRoutes from "./routes/Payment.js"
import connectDB from "./connectMongoDb.js";
import socialMediaRoutes from './routes/SocialMedia.js'
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// Get the directory name of the current module

// Specify the custom path to your .env file

connectDB();
// const store = new MongoStore({
//   url: 'mongodb+srv://admin:admin@cluster0.gygecir.mongodb.net/test',
//   collection: 'sessions'
// });
// store.on("error", function(e){
//   console.log("SESSION STORE ERROR ",e);
// })
// app.use(session({
//   store,
//   secret: 'foo',
//   cookie: { httpOnly: true,
//           expires: Date.now() + 1000*60*60*24*7,
//           maxAge: 1000*60*60*24*7
//   }
// }))
const app = express();
app.use(morgan('tiny'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
//app.use(express.)
app.use(cors());

//app.listen(port,()=>{console.log("Example app listening on port 5000")})

//app.get("/", (req,res,next)=>{res.send("server working");next()});
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/payments",paymentRoutes);
app.use("/socialmedia", socialMediaRoutes)
const PORT = process.env.PORT || 5000;
app.use((err,req,res,next)=>{
  const {status = 500, message = 'Something went wrong'} = err;
  res.status(status).send(message);
})
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
