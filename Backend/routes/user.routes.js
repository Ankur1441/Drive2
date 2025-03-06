const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const nodeMailer = require("nodemailer");
const randomString = require("randomstring");

/* /user/register */


router.post(
  "/register",
  body("email").trim().notEmpty().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { email, username, password } = req.body;
    console.log("Plain password:", password);

    // const hashPassword = await bcrypt.hash(password, 10);
    // const isMatch  = await bcrypt.compare(password, hashPassword);
    // console.log(isMatch);
    // const hashPassword = password;

    const newUser = await userModel.create({
      email,
      username,
      password: password,
    });
    res.json(newUser);
  }
);

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });
    console.log("user found", user);

    if (!user) {
      return res.status(401).json({
        message: "username  is incorrect",
      });
    }
    // console.log(password,user.password);

    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log("password match", isMatch);
    const isMatch = (hashPassword = password);

    if (!isMatch) {
      return res.status(400).json({
        message: "password is incorrect",
      });
    }

    /* jsonwebtoken */

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    /* cookie-parser */
    res.cookie("token", token);

    return "login successful"
  }
);

router.post("/forget-password", async (req, res) => {
  try {

    const {email}= req.body;
    
    if (!email) {
      return res.status(404).json({ message: "user not found" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = randomString.generate();
    await userModel.updateOne(
      { _id: user._id },
      { $set: { token: resetToken } }
    );

    const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.send({ success: true, msg: "Please check your mail" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update Password
    
    await userModel.updateOne(
      { _id: user._id },
      { $set: { password: newPassword, token: null } } 
    );

    res.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/forget-password", (req, res) => {
  res.render("forget-password"); // Render the "forgot-password" view
});


router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("reset-password", { token }); // Pass the token to the view
});

module.exports = router;