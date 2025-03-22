import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

// Wallet Authentication Route (for connecting MetaMask)
app.post('/api/auth/wallet', async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    try {
        const User = require('./models/User');

        // Check if wallet address already exists
        let user = await User.findOne({ walletAddress });

        if (user) {
            return res.status(200).json({
                message: 'Login successful',
                user,
            });
        }

        // If new user, register them
        user = new User({ walletAddress });
        await user.save();

        res.status(201).json({
            message: 'Signup successful',
            user,
        });
    } catch (error) {
        console.error('❌ Error during wallet auth:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
