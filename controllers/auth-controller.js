const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

// Sign up
exports.signUp= async (req, res) => {
    const{ name, email, password } = req.body;
    const imagesUpload = req.file ? req.file.filename : ''; 
    try {
      //check if user exists
      const existingUser = await UserModel.findOne({email});
      
      if (existingUser) {
        return res.status(400).json({message: "Email already exists"});
      }
      
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //new user object
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        profileImage: imagesUpload, 
      });
  
      //save
      await newUser.save();
      res.status(201).json({message: "User registered successfully"});   
    } catch (error) {
      console.error(error.message);
      res.status(500).json({message: "Server Error"});
    }
  };

//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // check if email exists
        const user =  await UserModel.findOne({email});

        if (!user) {
            return res.status(401).send({message: "User doesnot exist. Please create an account"})
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password.trim(), user.password);

        if (!isPasswordValid) {
            return res.status(401).send({message: "Password is invalid. Please check your password"})
        }

        // Generate JWT Token
        const token = jwt.sign({userId: user._id}, 'secret');

        // return with json token
        res.status(200).json({token, user: {email: user.email}});


    } catch(error) {
        console.error(error.message);
        res.status(500).send({message: "Login Error"})
    }
}