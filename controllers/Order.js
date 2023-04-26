
import crypto from "crypto";
import users from "../models/auth.js"
import Razorpay from "razorpay"; 
import moment from "moment";
import { checkQuestion } from "./auth.js";
export const checkout = async (req, res) => {
  
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
 
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
  });
  let order = {};
  try{
  order = await instance.orders.create(options);
  }
  catch(error){
      console.log(error);
  }
  //console.log(order);
  try{
  const  userId  = req.params.userId;
  const user = await users.findById({_id:userId});
  user.orderId = order.id;
 // console.log(user);
  user.save();
  res.status(200).json({
    success: true,
    order,
  });
}
catch (error){
    console.log(error);
    res.status(404).json({error})
   }
}
export const paymentKey = async(req,res) => {
  const key = process.env.RAZORPAY_API_KEY;
  res.status(200).json({key});
  
  
}
export const paymentVerification = async (req, res) => {
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   req.body;
    console.log(req.body);
    let order_Id = ''
    try{
      const  userId  = req.params.userId;
      const user = await users.findById({_id:userId});
      order_Id = user.orderId;
    //  console.log(user);
      //user.save();
      
       console.log()
  const body = order_Id + "|" + req.body.razorpayPaymentId;
  console.log(body);
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === req.body.razorpaySignature;
 // console.log(req.body.razorpaySignature);
 // console.log(expectedSignature)
 // console.log(expectedSignature);
  if (isAuthentic) {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET
    });
    const ord = await instance.orders.fetch(order_Id)
    var sub_type = '';
    var Q_rem =0;
    console.log(ord);
    if(ord.amount==10000)
        {sub_type = "Silver Plan";Q_rem = 5;}
    else if(ord.amount==100000)
        {sub_type="Gold Plan";Q_rem = 1000;}
    user.subPlan = sub_type;
    user.Q_rem=Q_rem;
    user.dateUpd = Date.now();
    console.log(sub_type);
    user.subDate = Date.now();
    user.save();
    console.log(user);
    
    

    res.status(200).json({'creation':'success',message:'You subscription was successful',user});
  } else {
    res.status(400).json({
      success: false,
      message: "There was a problem in creating the payment, the signature did not match",
    
    })
  }
}
catch(err){
    res.status(400).json({
      err
    })
  };
  
};