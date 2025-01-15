const express = require("express");
const app = express();
const PORT = 4000;
const connectToMongoDB = require("./db");
const mongoose = require("mongoose");
const User = require("./User");
const bcrypt = require("bcrypt");

app.use(express.json());
connectToMongoDB();

app.get("/", (req, res) => {
  res.json({ Welcome: "Welcome to Auth Using MERN and Bcrypt" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = {
    name,
    email,
    passwordHash,
  };
  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

app.post("/login",async (req,res)=>{
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if(foundUser){
        const passwordCompare = await bcrypt.compare(foundUser.password,password);
        if(passwordCompare){
            res
            .status(201)
            .json({ message: "User login successfull", user: foundUser });      
        }    
        else{
            res
            .status(201)
            .json({ message: "Incorrect Credentials" });      
        }
    }else{
        res
        .status(201)
        .json({ message: "User not found", user: foundUser});  
    }
})

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT: ${PORT}`);
});
