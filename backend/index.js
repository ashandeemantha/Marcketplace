const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// Log the MongoDB URL for debugging
//console.log("MongoDB URL:", process.env.MONGODB_URL);

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// User Model
const userModel = mongoose.model("user", userSchema);

// Root API
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup API
app.post("/signup", async (req, res) => {
  try {
    console.log("Received Signup Data:", req.body);
    const { email } = req.body;

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email ID is already registered", alert: false });
    }

    // Save new user
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({ message: "Successfully signed up", alert: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Login API
app.post("/Login", async (req, res) => {
  try {
    console.log("Received Login Data:", req.body);
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not available, please signup first",
        alert: false,
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
        alert: false,
      });
    }

    // Successful login response
    const dataToSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };

    // Log user data in the terminal
    console.log("User Data:", dataToSend);

    return res.status(200).json({
      message: "Login successful",
      alert: true,
      data: dataToSend,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      alert: false,
    });
  }
});

//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Upload successfully"})
})


//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


// Start Server
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
