const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const connectToMongoDB = require("./db");
const AuthUser = require("./models/AuthUser");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(cors());
connectToMongoDB();

app.get("/", (req, res) => {
  res.json({ Welcome: "Welcome to Auth Using MERN and Bcrypt" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await AuthUser.findOne({ email });
  if (existingUser != null) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new AuthUser({
    username: name,
    email,
    password: passwordHash,
  });
  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser.username });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await AuthUser.findOne({ email });

    if (foundUser) {
      const passwordCompare = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (passwordCompare) {
        res
          .status(200)
          .json({ message: "User login successful", user: foundUser.username });
      } else {
        res.status(401).json({ message: "Incorrect Credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT: ${PORT}`);
});
