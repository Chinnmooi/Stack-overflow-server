import mongoose from "mongoose";
//import {Schema} from "mongoose";
import Posts from "./posts.js";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now() },
  subDate: {type: Date,default:null},
  dateUpd: {type: Date, default: Date.now()},
  subPlan: {type: String, default: "NoSubscription"},
  Q_rem: {type: Number},
  orderId: {type: String},
  posts: [{type:mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  about: {type: String, default:null},
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

export default mongoose.model("User", userSchema);
