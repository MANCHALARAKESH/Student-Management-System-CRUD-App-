const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const crypto=require("crypto");
const nodemailer=require("nodemailer");
const user = require("../model/user");

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { name, email, phone, gender, password } = req.body;

  try {
    // check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      gender,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      User: savedUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { id: exist._id ,email: exist.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});



// ================= FORGOT =================//

router.post("/forgot", async (req, res) => {
  const {email}=req.body;
  try{
    const exist = await User.findOne({email});
    if(!exist){
      res.status(400).json({message:"User not found"});
    }

    // Generate a reset token (for simplicity, using JWT here)
    const resetToken =crypto.randomBytes(20).toString("hex");

    // In a real application, you would save this token in the database with an expiration time
    // and send an email to the user with a link containing the token.

    exist.resetToken=resetToken;
    exist.resetTokenExpiry=Date.now()+3600000; // Token valid for 1 hour
    await exist.save();


    const resetLink=`http://localhost:3000/reset-password?token=${resetToken}`;

    // Send email to user with reset link (using nodemailer)
    const transporter=nodemailer.createTransport({
      service:"Gmail",
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
    });

    const mailOptions={
      from:process.env.EMAIL_USER,
      to:exist.email,
      subject:"Password Reset",
      text:`Click the following link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
        console.log(err);
        res.status(500).json({message:"Error sending email"});
      }else{
        console.log("Email sent:",info.response);
      }
    });

    res.json({
      message: "Reset link sent to email",
    });

  }catch(err){
    res.status(500).json({ message: "Internal server error" });
  }
});


// ================= RESET PASSWORD =================//

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });

  }catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
