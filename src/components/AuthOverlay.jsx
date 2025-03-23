import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, GraduationCap, Briefcase } from 'lucide-react';
import axios from 'axios';

const AuthOverlay = ({ isOpen, onClose, walletAddress, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);a
      setError('');
      
      await axios.post('http://localhost:5000/api/users', {
        walletAddress,
        name,
        email,
        role: isMentor ? 'mentor' : 'student'
      });
      
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Complete Registration</h2>
        <p className="text-sm text-gray-600 mb-6">
          Connected wallet: {walletAddress}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => setIsMentor(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                !isMentor ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              <GraduationCap size={18} />
              Student
            </button>
            <button
              type="button"
              onClick={() => setIsMentor(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isMentor ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              <Briefcase size={18} />
              Mentor
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthOverlay;