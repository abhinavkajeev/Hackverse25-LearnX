// components/AuthOverlay.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, GraduationCap, Briefcase } from 'lucide-react';
import axios from 'axios';
import { ethers } from 'ethers';

const AuthOverlay = ({ isOpen, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('Install MetaMask');
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      checkUserExists(address);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkUserExists = async (address) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users/check', {
        params: { walletAddress: address }
      });
      
      if (!response.data.exists) {
        setStatus('new-user');
      } else {
        setStatus('existing-user');
        setTimeout(onClose, 1500);
      }
    } catch (err) {
      setError('Error checking user existence');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/users', {
        walletAddress,
        name,
        email,
        role: isMentor ? 'mentor' : 'student'
      });
      setStatus('success');
      setTimeout(onClose, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
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

            {!walletAddress ? (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Connect Wallet</h2>
                <p className="text-gray-600">
                  Connect your wallet to continue to LearnX
                </p>
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
                    hover:bg-blue-700 transition-colors w-full disabled:opacity-50"
                >
                  {loading ? 'Connecting...' : 'Connect with MetaMask'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ) : status === 'new-user' ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-center">
                  Complete Registration
                </h2>

                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => setIsMentor(false)}
                    className={`px-4 py-2 rounded-full flex items-center gap-2
                      ${!isMentor ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    <GraduationCap size={18} />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMentor(true)}
                    className={`px-4 py-2 rounded-full flex items-center gap-2
                      ${isMentor ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
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
                      className="w-full pl-10 pr-4 py-2 border rounded-lg
                        focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg
                        focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg
                    font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Complete Registration'}
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              </motion.form>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">
                  {status === 'success' ? 'Registration Successful!' : 'Welcome Back!'}
                </h3>
                <p className="text-gray-600 break-words text-sm">
                  Wallet: {walletAddress}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthOverlay;