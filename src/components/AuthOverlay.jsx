import { useState, useEffect } from "react";

function AuthOverlay({ isOpen, onClose, isLogin, setIsLogin, walletAddress, setWalletAddress }) {
  const [localWalletAddress, setLocalWalletAddress] = useState(walletAddress || "");
  const [role, setRole] = useState(""); // No default role, user must select
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update local wallet address when prop changes
  useEffect(() => {
    setLocalWalletAddress(walletAddress || "");
  }, [walletAddress]);

  // Handle overlay visibility with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!localWalletAddress) {
      alert("Please enter a wallet address");
      return;
    }
    
    if (!isLogin && !role) {
      alert("Please select a role");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        // Login existing user
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: localWalletAddress }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Login successful
          setWalletAddress(localWalletAddress);
          onClose();
        } else {
          // Login failed
          alert(data.message || "Login failed. Please check your wallet address.");
        }
      } else {
        // Register new user
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            walletAddress: localWalletAddress,
            role: role
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Registration successful
          setWalletAddress(localWalletAddress);
          onClose();
        } else {
          // Registration failed
          alert(data.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An error occurred during authentication. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-2xl w-96 relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Show Role Selection Only for Signup */}
        {!isLogin && (
          <div className="mb-6">
            <p className="text-lg font-medium mb-3 text-gray-700">Are you a:</p>
            <div className="flex justify-between gap-4">
              <button
                className={`flex-1 px-4 py-3 rounded-lg border-2 text-lg font-semibold transition-all ${
                  role === "Learner"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50"
                }`}
                onClick={() => setRole("Learner")}
                type="button"
              >
                Learner
              </button>
              <button
                className={`flex-1 px-4 py-3 rounded-lg border-2 text-lg font-semibold transition-all ${
                  role === "Mentor"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50"
                }`}
                onClick={() => setRole("Mentor")}
                type="button"
              >
                Mentor
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Wallet Address Input */}
          <input
            type="text"
            placeholder="Enter your Wallet Address"
            value={localWalletAddress}
            onChange={(e) => setLocalWalletAddress(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-blue-500 transition-all"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? "Processing..." 
              : isLogin 
                ? "Login" 
                : "Sign Up"}
          </button>
        </form>

        {/* Toggle Between Login & Signup */}
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 text-sm mt-4 cursor-pointer text-center hover:text-blue-600 transition-all"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthOverlay;