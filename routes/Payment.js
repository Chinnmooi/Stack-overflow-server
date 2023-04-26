import  express from "express";
import {checkout, paymentKey, paymentVerification} from "../controllers/Order.js"
import auth from "../middleware/auth.js";
const router = express.Router();
router.post('/createOrder/:userId', checkout);
router.post('/success/:userId',paymentVerification);
router.post('/getKey',paymentKey)
export default router;
