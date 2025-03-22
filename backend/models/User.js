import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: String,
  email: String,
  role: { 
    type: String, 
    enum: ['student', 'mentor'], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);