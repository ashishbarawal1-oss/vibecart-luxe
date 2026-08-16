import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vibekart')
  .then(() => console.log('⚡ Connected to MongoDB Mainframe'))
  .catch((err) => console.log('Database Connection Error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  priceCents: { type: Number, required: true },
  image: { type: String, required: true },
  rating: {
    stars: { type: Number, default: 4.5 }
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// 1. Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Add New Product
app.post('/api/products', async (req, res) => {
  try {
    const { title, category, priceCents, image, rating } = req.body;
    
    const newProduct = new Product({
      id: Date.now(),
      title: title || 'New Cyber Item',
      category: category || 'General',
      priceCents: Number(priceCents) || 9999,
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
      rating: { stars: rating?.stars || 5.0 }
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product deployed successfully!', product: newProduct });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Failed to deploy product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend Server running on http://localhost:${PORT}`));