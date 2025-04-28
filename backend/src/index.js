import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './db.js'
import Transaction from './models/transaction.model.js'


let app = express();
dotenv.config();
app.use(cors());
app.use(express.json())

const categories=['Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment'];
app.get('/api/transactions', async (req, res) => {
  
  let transactions = await Transaction.find({}).exec();
  res.json(transactions);
  
});

app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, date, description, category } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, {
      amount,
      date,
      description,
      category
    }, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})






app.post('/api/transactions', async (req, res) => {
  const { amount, date, description, category } = req.body;
  try {
    const transaction = await Transaction.create({
      amount,
      date,
      description,
      category
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.get('/api/categories', async (req, res) => {
  res.status(200).json({categories:categories});
})
app.post('/api/categories', async (req, res) => {
  const { name } = req.body;
  try {
    categories.push(name)
    res.status(201).json({categories:categories});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectDB()
  
});