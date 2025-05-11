const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database Connection Error:", err));

// Enhanced User Schema with Role
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords do not match"
    }
  },
  image: {
    type: String,
    default: "default_profile_image_url" // Set your default image URL here
  },
  role: {
    type: String,
    enum: ["admin", "buyer", "farmer"],
    default: "buyer",
    required: [true, "Role is required"]
  }
}, { timestamps: true });

// User Model
const userModel = mongoose.model("user", userSchema);

// Root API
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup API with Role
app.post("/signup", async (req, res) => {
  try {
    console.log("Received Signup Data:", req.body);
    const { email, role } = req.body;

    // Validate role
    if (!["admin", "buyer", "farmer"].includes(role)) {
      return res.status(400).json({ 
        message: "Invalid role. Must be admin, buyer, or farmer", 
        alert: false 
      });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Email ID is already registered", 
        alert: false 
      });
    }

    // Create new user with role
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({ 
      message: "Successfully signed up", 
      alert: true,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Signup Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: error.message, 
        alert: false 
      });
    }
    res.status(500).json({ 
      message: "Internal Server Error", 
      alert: false 
    });
  }
});

// Login API with Role
app.post("/login", async (req, res) => {
  try {
    console.log("Received Login Data:", req.body);
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not registered, please sign up first",
        alert: false,
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
        alert: false,
      });
    }

    // Successful login response with role
    const dataToSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      role: user.role
    };

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

// Product Section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

// Save product in database
app.post("/uploadProduct", async (req, res) => {
  try {
    const { role } = req.body;
    if (!(role === 'admin' || role === 'farmer')) {
      return res.status(403).json({ message: "You are not authorized to upload products" });
    }
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.status(201).json({ message: "Upload successfully" });
  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ message: "Error uploading product" });
  }
});

// Get all products
app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Product Fetch Error:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));