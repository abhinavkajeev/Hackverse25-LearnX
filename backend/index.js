// Import required packages
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Root route (to check if server is working)
app.get('/', (req, res) => {
  res.send('✅ AI Backend is running!');
});

// AI Route - Handles user questions and gets responses from Gemini
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    // Validate input
    if (!question) {
      return res.status(400).json({ error: 'Question is required!' });
    }

    // Access Gemini AI model (Updated to use a free-tier supported model)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Make request to Gemini API
    const result = await model.generateContent({
      contents: [{ parts: [{ text: question }] }],
    });

    // Extract response
    const response = result.response.text();

    res.status(200).json({ answer: response });
  } catch (error) {
    console.error('❌ Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 AI Backend running on port ${port}`);
});