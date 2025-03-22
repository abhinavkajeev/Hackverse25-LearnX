import { useState, useEffect } from "react";

function AuthOverlay({ isOpen, onClose, isLogin, setIsLogin }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [role, setRole] = useState(""); // No default role, user must select
  const [isVisible, setIsVisible] = useState(false);

  // Handle overlay visibility with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wallet Address:", walletAddress);
    if (!isLogin) {
      console.log("Role:", role);
    }
    onClose(); // Close overlay after submission
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
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-blue-500 transition-all"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
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