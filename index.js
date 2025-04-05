import express from "express";
import mongoose from "mongoose";
import "./models/userSchema.js";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
app.use(cors());

const DB_URL =
  "mongodb+srv://ayeshaaghaffar07:ayesha2007@cluster0.m32gt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Port = 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database not connected:", error);
  });

const User = mongoose.model("User");

// // Signup api
// app.post("/signup", async (req, res) => {
//   try {
//       const { name, email, password } = req.body;
//       const hash = await bcrypt.hash(password, 10);
//       const user = new User({ name, email, password: hash });
//       await user.save();
//       res.json(user);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }

// });
// Signup api muzammil 
app.post("/signup", async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const exist = await User.findOne({email})
      if(exist) return res.status(400).json({message:"Email already in use!!"})
      const user = new User({ name, email, password: hash });
      await user.save();
      res.json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }

});

// // Login api

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email: email })
//   .then((user) => {


//     if (user) {
//       bcrypt.compare(password, user.password, (err, response) => {
//         if (err) {
//           res.json("the password is incorrect");
//         }
//         if (response) {
//           res.json("Login successful");
//         }
//       });

     
//     } else {
//       res.json("User not found");
//     }
//   });
// });

// Login api

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If password matches, send success response
    res.json({ message: "Login successful" });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ error: err.message });
  }
});
  // const isMatch = await bcrypt.compare(password, user.password) 
  // if (!isMatch) return res.status(400).json({message:"Invalid credentials"})
  // }
  // User.findOne({ email: email })

