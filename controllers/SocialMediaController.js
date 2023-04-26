import Users from '../models/auth.js'
import Posts from '../models/posts.js';
import AppError from '../AppError.js';

export const  makePost = async (req,res) =>{console.log("Life suckas")
     //console.log(req.file,"file");
     console.log(req.body,"body");
     const {ui} = req.params;
     let user = await Users.findById(ui)
     //console.log(user," ",ui)
     if(!user)return new Error()//AppError("User not foound",501);
     //return new error()
     
     console.log(user);
     let newPost = await Posts.create({user:user._id, desc: req.body.desc,image:req.file.path});
     if(!newPost){console.log("Murder");return new AppError("Could not Create Post",504);}
     console.log(user);
     user.posts.push(newPost);
     user.save();
     newPost.save();
     return res.status(200).json({msg:"Created Successfully"})
    
     

     //console.log("what the fuck?")
     //res.status(200).json({msg:"Hello"});
}

export const getPost = async (req,res)=>{
     try{
     const posts = await Posts.find();
     console.log(posts);
     res.status(200).json(posts);
     }catch(err){
          res.status(404).json({msg:"error"})
     }

}
export const getPostUser = async (req,res)=>{console.log("faith");
     try{
     const {ui} = req.params;console.log(ui);
     let User = await Users.findById(ui);
    // console
     const fr = User.following;
     console.log(fr);
     let retPosts = [];
     for(let i = 0;i<fr.length;i++){
     console.log(fr[i]);
     let custPosts = await Posts.find({user:fr[i]}).populate('user') ;
     console.log(custPosts);
     for( let i=0;i<custPosts.length;i++)     
     retPosts.push(custPosts[i]);
     }
     console.log(retPosts);
     res.status(200).json(retPosts);
     }catch(err){
          res.status(404).json({msg:"error"})
     }

}

export const addFriend = async (req,res) =>{
     
     const {ui} = req.params;
     console.log(ui," ",req.body);
     let user = await Users.findById(req.body.F_id);
     user.followers.push(ui);
     user.save();
     user = await Users.findById(ui);
     user.following.push(req.body.F_id);
     user.save();
     return res.status(200).json({result:user,token:req.headers.authorization.split(" ")[1]});
}

export const removeFriend = async (req,res) => {
     const {ui} = req.params;
     let user = await Users.findById(req.body.F_id);
     console.log(req.body.F_id," ",user.followers)
     user.followers = user.followers.filter(ele => ele.toString()!==ui);
     console.log(user.followers);
     user.save();
     user = await Users.findById(ui);
     console.log(ui," ",user.following)
     user.following = user.following.filter(ele => ele.toString()!==req.body.F_id);
     console.log(user.following)
     user.save();
     return res.status(200).json({result:user ,token:req.headers.authorization.split(" ")[1]});
}

export const deletePost = async (req,res) => {
     try{
     const id = req.body.P_id;
     const del = await Posts.findByIdAndDelete(id);
     console.log(del);
     Posts.save();
     console.log(del);
     res.status(200).json({msg:"Post deleted"});
     console.log(del);
     }
     catch(err){res.status(404).json({err});}
}
