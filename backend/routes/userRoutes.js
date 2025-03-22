import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Check user existence
router.get('/check', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.query.walletAddress });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      walletAddress: req.body.walletAddress,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
});

export default router;