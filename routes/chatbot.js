import express from "express";
const router = express.Router();
import { getMessage } from "../controllers/chatBot.js";
router.post('/getmsg', getMessage);
export default router;