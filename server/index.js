import express from "express";
import mongoose from "mongoose";
import "./models/userSchema.js";

const app = express();

app.use(express.json());

const DB_URL = "mongodb+srv://ayeshaaghaffar07:ayesha2007@cluster0.m32gt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URL, {
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Database not connected:', error);
});


app.post('/signup',(req,res)=>{
  UserModel.create(req.body)
  .then((data)=>{
    res.json(data)
  })
  .catch((error)=>{
    res.json(error)
  })
})


const Port = 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
    });    