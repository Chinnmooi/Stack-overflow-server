import express from ecpress;
const router = express.Router();
import { getMessage } from "../controllers/chatBot";
router.post('/getmsg', getMessage);
export default router;