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
// app.get("/import-products", async (req, res) => {

//   try {

//     // 1. Get products from public API
//     const response = await fetch(
//       "https://fakestoreapi.com/products"
//     );

//     const data = await response.json();

//     // 2. Convert API data into OUR product format
//     const products = data.map((product) => ({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       image: product.image,
//       rating: product.rating.rate,
//       stock: 20
//     }));

//     // 3. Save products into MongoDB
//     await Product.deleteMany({});

//     await Product.insertMany(products);

//     // 4. Send response
//     res.json({
//       message: "Products imported successfully",
//       count: products.length
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Failed to import products"
//     });

//   }

// });

app.get("/import-products", async (req, res) => {
  try {
    console.log("1. Import route called");

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    console.log("2. Public API responded:", response.status);

    const data = await response.json();

    console.log("3. Products received:", data.length);

    const products = data.map((product) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating.rate,
      stock: 20,
    }));

    console.log("4. Products transformed");

    await Product.deleteMany({});
    console.log("5. Old products deleted");

    await Product.insertMany(products);
    console.log("6. Products saved to MongoDB");

    res.json({
      message: "Products imported successfully",
      count: products.length,
    });
  } catch (error) {
    console.error("Import error:", error);

    res.status(500).json({
      message: "Failed to import products",
      error: error.message,
    });
  }
});
app.get("/api/products", async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    const filter = {};

    if (search && search.trim()) {
      filter.title = {
        $regex: search.trim(),
        $options: 'i',
      };
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined && minPrice !== '') {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined && maxPrice !== '') {
        filter.price.$lte = Number(maxPrice);
      }
    }

    let query = Product.find(filter);

    if (sortBy === 'price' && sortOrder === 'asc') {
      query = query.sort({ price: 1 });
    } else if (sortBy === 'price' && sortOrder === 'desc') {
      query = query.sort({ price: -1 });
    }

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;

    const products = await query.skip((pageNumber - 1) * pageSize).limit(pageSize);

    console.log('Fetching products from MongoDB...');

    res.json(products);
  } catch (error) {
    console.error("Fetch error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});