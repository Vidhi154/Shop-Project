import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Product from "./models/Product.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

// app.get("/import-products", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://fakestoreapi.com/products"
//     );

//     const data = await response.json();
//     console.log("Fetched products:");
//     console.log(data);

//     res.json(data);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Failed to fetch products",
//     });
//   }
// });
app.get("/import-products", async (req, res) => {

  try {

    // 1. Get products from public API
    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    const data = await response.json();

    // 2. Convert API data into OUR product format
    const products = data.map((product) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating.rate,
      stock: 20
    }));

    // 3. Save products into MongoDB
    await Product.deleteMany({});

    await Product.insertMany(products);

    // 4. Send response
    res.json({
      message: "Products imported successfully",
      count: products.length
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to import products"
    });

  }

});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});