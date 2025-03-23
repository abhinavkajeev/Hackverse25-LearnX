import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { BrowserProvider } from "ethers";
import AuthOverlay from "./AuthOverlay";

function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Connect MetaMask Wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      // Check user existence in MongoDB
      const response = await fetch(
        `http://localhost:5000/api/users/check?walletAddress=${address}`
      );
      
      if (!response.ok) throw new Error("User check failed");
      
      const data = await response.json();

      if (data.exists) {
        setWalletAddress(address);
        navigate("/courses");
      } else {
        setWalletAddress(address);
        setIsAuthOpen(true);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRegistrationSuccess = () => {
    setIsAuthOpen(false);
    navigate("/courses");
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
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          {["Home", "About", "Courses"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block font-medium text-black hover:text-yellow-500 py-2 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
          
          {walletAddress && (
            <Link
              to="/courses"
              className="block font-medium text-black hover:text-yellow-500 py-2 transition-all duration-300"
            >
              My Courses
            </Link>
          )}
          
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="block w-full text-left font-medium text-black hover:text-yellow-500 py-2 transition-all duration-300 disabled:opacity-50"
          >
            {isConnecting
              ? "Connecting..."
              : walletAddress
              ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div>
      )}

      {/* Registration Overlay */}
      <AuthOverlay
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        walletAddress={walletAddress}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
}

export default Navbar;