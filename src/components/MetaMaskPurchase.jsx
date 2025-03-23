import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';

// SVG icons for states
const MetaMaskIcon = () => (
  <svg width="40" height="40" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.9582 1L19.8241 10.7183L22.2103 5.09902L32.9582 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.04175 1L15.0987 10.809L12.7866 5.09902L2.04175 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.2365 23.5466L24.7985 28.8816L32.2675 30.9315L34.4484 23.6536L28.2365 23.5466Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.570557 23.6536L2.7376 30.9315L10.2066 28.8816L6.78255 23.5466L0.570557 23.6536Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.86285 14.6652L7.8252 17.8272L15.2063 18.1548L14.9718 10.211L9.86285 14.6652Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.1371 14.6652L19.9633 10.1291L19.8242 18.1548L27.1914 17.8272L25.1371 14.6652Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.2065 28.8816L14.7859 26.7101L10.8886 23.7031L10.2065 28.8816Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.2141 26.7101L24.7935 28.8816L24.1114 23.7031L20.2141 26.7101Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#9CA3AF"/>
    <path d="M12 2V4" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MetaMaskPurchase = ({ courseId, courseTitle, price = 0.05, onPurchaseComplete }) => {
  const [purchaseState, setPurchaseState] = useState('initial'); // initial, connecting, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState('');

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setErrorMessage('MetaMask not installed. Please install MetaMask to continue.');
      setPurchaseState('error');
      return;
    }

    setPurchaseState('connecting');
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setPurchaseState('initial');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setErrorMessage('Failed to connect to MetaMask. Please try again.');
      setPurchaseState('error');
    }
  };

  const handlePurchase = async () => {
    if (!account) {
      await connectMetaMask();
      return;
    }

    setPurchaseState('processing');
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Convert ETH price to Wei
      const weiAmount = ethers.utils.parseEther(price.toString());
      
      // Send the transaction
      const transaction = await signer.sendTransaction({
        to: '0xYourWalletAddressHere', // Replace with your actual wallet address
        value: weiAmount,
      });
      
      // Wait for the transaction to be mined
      await transaction.wait();
      
      setPurchaseState('success');
      
      // Call the callback function to update parent component
      if (onPurchaseComplete) {
        // Wait for animation to complete
        setTimeout(() => {
          onPurchaseComplete(courseId);
        }, 1500);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      setErrorMessage('Transaction failed. Please try again.');
      setPurchaseState('error');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={purchaseState}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
        className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto"
      >
        {purchaseState === 'success' ? (
          <motion.div 
            variants={successVariants}
            className="flex flex-col items-center text-center py-6"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-4 bg-green-100 p-4 rounded-full"
            >
              <CheckIcon />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Purchase Successful!</h3>
            <p className="text-gray-600 mb-6">You now have full access to "{courseTitle}"</p>
            <p className="text-sm text-gray-500">Transaction has been confirmed on the blockchain</p>
          </motion.div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Purchase Course</h3>
                <p className="text-gray-600">{courseTitle}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <MetaMaskIcon />
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 my-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">{price} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network</span>
                <span className="font-medium">Ethereum Mainnet</span>
              </div>
            </div>
            
            {account && (
              <div className="mt-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Connected Account</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded truncate">
                  {account}
                </p>
              </div>
            )}
            
            {purchaseState === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                {errorMessage}
              </div>
            )}
            
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={account ? handlePurchase : connectMetaMask}
              disabled={purchaseState === 'processing' || purchaseState === 'connecting'}
              className={`mt-2 flex justify-center items-center h-12 rounded-md font-medium transition-colors ${
                purchaseState === 'processing' || purchaseState === 'connecting'
                  ? 'bg-indigo-400 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {purchaseState === 'processing' || purchaseState === 'connecting' ? (
                <div className="flex items-center">
                  <SpinnerIcon />
                  <span className="ml-2">
                    {purchaseState === 'connecting' ? 'Connecting...' : 'Processing...'}
                  </span>
                </div>
              ) : (
                <span>{account ? `Purchase for ${price} ETH` : 'Connect MetaMask'}</span>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MetaMaskPurchase;