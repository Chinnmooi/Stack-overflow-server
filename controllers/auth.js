import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from 'moment';
import users from "../models/auth.js";
import AppError from "../AppError.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let newUser = await users.create({
      name, //name is same as name email is same as email and password is not same as hashed password
      email,
      password: hashedPassword,
      subPlan: 'NoSubscription',
      subDate: null,
      dateUpd: Date.now(),
      Q_rem: 1,
    });newUser = null;
    
    newUser = await users.findOne({email}).exec();

    //if(!newUser)
    // return new error("Life Sucks")
    // return AppError("UserNotFound")
    console.log(newUser.following);
    const iid = newUser._id
    newUser.following.push(iid);
    console.log(newUser.following);
    newUser.save();
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    let op = { result: newUser,token };
    res.status(200).json(op);
  } catch (error) {
    res.status(500).json(error);
  }
};
export function checkQuestion(eu){

  // const eu = await Users.findOne({ _id :userID });
  let subPlanRem = 0;
  let Currdate = Date.now();
  //console.log(1)
  if(eu.subDate){
  //  console.log(2);console.log(Currdate);console.log(eu.subDate.getTime());
    subPlanRem = Currdate - eu.subDate.getTime()
  //console.log(subPlanRem);
  subPlanRem/=(1000*60*60*24);
 // console.log(3);
  if(subPlanRem>30){eu.subPlan = 'Free Plan';
  eu.subDate = null;}
        }
  if(!moment(Currdate).isSame(eu.dateUpd,'day')){console.log(moment(Currdate));console.log(eu.dateUpd);
       eu.dateUpd = Date.now()
       if(eu.subPlan == 'Free Plan'){
        eu.Q_rem = 1;
     }
     else if(eu.subPlan == 'Silver Plan'){
       eu.Q_rem = 5;
    }
    else{
      eu.Q_rem =  1000;
    }
  }
     eu.save();
  }

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    console.log(existinguser);
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    checkQuestion(existinguser);
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};
