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

/* ------------------- MODELS ------------------- */

// User Model
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    image: {
      type: String,
      default: "default_profile_image_url",
    },
    role: {
      type: String,
      enum: ["admin", "buyer", "farmer"],
      default: "buyer",
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

// Product Model
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

// Order Model
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    items: { type: Array, required: true },
    userId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    buyerDetails: { type: Object, required: true },
    transactionId: { type: String },
    status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

/* ------------------- ROUTES ------------------- */

// Root
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!["admin", "buyer", "farmer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role", alert: false });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered", alert: false });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      alert: true,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: error.message, alert: false });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not registered", alert: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password", alert: false });
    }

    res.status(200).json({
      message: "Login successful",
      alert: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message, alert: false });
  }
});

// Upload Product
app.post("/uploadProduct", async (req, res) => {
  try {
    const { role } = req.body;
    if (!(role === "admin" || role === "farmer")) {
      return res.status(403).json({ message: "Unauthorized to upload products" });
    }

    const product = new productModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get All Products
app.get("/product", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Product Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create Order
app.post("/create-order", async (req, res) => {
  try {
    const { items, userId, paymentMethod, totalAmount, deliveryFee, buyerDetails, transactionId } = req.body;

    const newOrder = new Order({
      orderId: `ORD${Date.now()}`,
      items,
      userId,
      paymentMethod,
      totalAmount,
      deliveryFee,
      buyerDetails,
      transactionId,
      status: paymentMethod === "online" ? "Paid" : "Pending",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get All Orders (Admin)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Orders Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update Order Status
app.patch("/orders/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Order Update Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get Order by Order ID
app.get("/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get Orders by User ID (with product details)
app.get("/orders/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).lean().sort({ createdAt: -1 });

    for (const order of orders) {
      for (const item of order.items) {
        const product = await productModel.findById(item.productId).lean();
        if (product) {
          item.name = product.name;
          item.image = product.image;
        }
      }
    }

    res.json(orders);
  } catch (error) {
    console.error("User Orders Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ------------------- START SERVER ------------------- */
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
