import mongoose from "mongoose";
import Users from "./auth.js"
const postSchema = mongoose.Schema(  {
    user: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true },
    desc: {type: String, default: ''},
    likes: {type: [String], default: []},
    dislike: {type: [String], default: []},
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    image: {type: String, default:null},
  },
  {
    timestamps: true,
  }

);
export default mongoose.model("Post",postSchema);