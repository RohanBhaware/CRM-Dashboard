const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

const router=express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide name, email, password and role' });
  }

  if (!['admin', 'manager'].includes(role)) {
    return res.status(400).json({ message: 'Role must be admin or manager' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.status(201).json({ token, role: user.role });
});

router.post("/login",async(req,res)=>{

 const {email,password}=req.body;

 const user=await User.findOne({email});

 if(!user){
   return res.status(400).json({
      message:"User Not Found"
   });
 }

 const isMatch=await bcrypt.compare(
    password,
    user.password
 );

 if(!isMatch){
   return res.status(400).json({
      message:"Wrong Password"
   });
 }

 const token=jwt.sign(
    {
      id:user._id,
      role:user.role
    },
    process.env.JWT_SECRET
 );

 res.json({
   token,
   role:user.role
 });

});

module.exports=router;
