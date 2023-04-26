import  express from "express";
import { makePost } from "../controllers/SocialMediaController.js";
import multer from "multer";
import { storage } from "../cloudinary/cloudinary.js"
import { getPost } from "../controllers/SocialMediaController.js";
import { addFriend } from "../controllers/SocialMediaController.js";
import { removeFriend } from "../controllers/SocialMediaController.js";
import  auth  from "../middleware/auth.js"
import { getPostUser } from "../controllers/SocialMediaController.js";
import { deletePost } from "../controllers/SocialMediaController.js";
const upload = multer({ storage})
const router = express.Router();
router.post('/postupload/:ui', upload.single('file'),makePost);
router.get('/getposts/:ui',getPostUser);
router.post('/addfriend/:ui',addFriend);
router.post('/removefriend/:ui',removeFriend);
router.post('/deletepost/:ui',deletePost);
//router.post('/success/:userId',paymentVerification);
//router.post('/getKey',paymentKey)
export default router;
