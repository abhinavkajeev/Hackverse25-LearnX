import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { BrowserProvider } from "ethers";
import AuthOverlay from "./AuthOverlay";

function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Connect MetaMask Wallet with MongoDB check
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Check if address exists in MongoDB
        const response = await fetch(`/api/users/check?address=${address}`);
        
        
        if (response.exists) {
          // Address exists, directly connect
          setWalletAddress(address);
        } else {
          // Address doesn't exist, show auth overlay for registration
          setWalletAddress(""); // Keep as not connected yet
          setIsLogin(false); // Set to registration mode
          setIsAuthOpen(true); // Open auth overlay
        }
      } catch (error) {
        console.error("Wallet connection failed", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-2xl">LearnX</div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {["Home", "About", "Courses"].map((item) => (
            <Link
              key={item}
              to={(item==="Home") ? "/" : `/${item.toLowerCase()}`}
              className="font-medium relative inline-block text-black hover:text-yellow-500 transition-all duration-300 ease-in-out hover:scale-110 text-lg"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-yellow-500 transition-all duration-300 ease-in-out transform -translate-x-1/2 hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 group transition-transform duration-300 ease-in-out hover:scale-110">
            <ShoppingCart size={20} className="group-hover:size-9 transition-all duration-300 ease-in-out" />
          </button>

          {/* Wallet Connect Button */}
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="border-2 border-black px-4 py-2 bg-gray-200 rounded-md font-medium hover:bg-gray-300 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting
              ? "Connecting..."
              : walletAddress
              ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </button>

          {/* Add "My Courses" button when wallet is connected */}
          {walletAddress && (
            <Link
              to="/courses"
              className="border-4 border-black shadow-[4px_4px_0px_#000] px-4 py-2 bg-red-400 font-semibold transition-all duration-300 ease-in-out hover:scale-110 active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              My Courses
            </Link>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          {["Home", "About", "Courses"].map((item) => (
            <Link
              key={item}
              to={(item==="Home") ? "/" : `/${item.toLowerCase()}`}
              className="block font-medium text-black hover:text-yellow-500 py-2 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
          {/* Also add My Courses to mobile menu when wallet is connected */}
          {walletAddress && (
            <Link
              to="/courses"
              className="block font-medium text-black hover:text-yellow-500 py-2 transition-all duration-300"
            >
              My Courses
            </Link>
          )}
        </div>
      )}

      {isAuthOpen && (
        <AuthOverlay
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          walletAddress={walletAddress || ""}
          setWalletAddress={setWalletAddress}
        />
      )}
    </>
  );
}

export default Navbar;