import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Wallet-based authentication (Login or Signup)
router.post('/wallet-auth', async (req, res) => {
    const { walletAddress, username, email } = req.body;

    try {
        let user = await User.findOne({ walletAddress });

        if (user) {
            // User already exists (Login)
            return res.status(200).json({ message: 'Login successful', user });
        }

        // Create new user (Signup)
        user = new User({ walletAddress, username, email });
        await user.save();
        
        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

export default router;
