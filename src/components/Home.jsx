import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverButton, setHoverButton] = useState(null);
  const [animateImages, setAnimateImages] = useState(false);
  
  // Set loaded state after component mounts for entrance animations
  useEffect(() => {
    setIsLoaded(true);
    
    // Start image animation cycle
    const interval = setInterval(() => {
      setAnimateImages(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleGetStarted = () => {
    navigate('/courses');
  };
  
  const handleWatchDemo = () => {
    setShowDemoModal(true);
  };

  return (
    <section className="bg-[#ffebd6] container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute top-20 left-20 w-32 h-32 bg-red-400 rounded-full opacity-20 transition-all duration-1000 ${isLoaded ? 'scale-100' : 'scale-0'}`}></div>
        <div className={`absolute bottom-20 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-30 transition-all duration-1000 ${isLoaded ? 'scale-100' : 'scale-0'}`}></div>
        <div className={`absolute top-1/2 right-1/4 w-16 h-16 bg-green-300 rounded-full opacity-20 transition-all duration-1000 ${isLoaded ? 'scale-100' : 'scale-0'}`}></div>
      </div>

      <div className={`flex flex-col justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl font-bold leading-tight mb-4 relative">
          <span className="inline-block transition-transform duration-300 hover:translate-x-2">Build</span> your <span className="inline-block transition-transform duration-300 hover:-translate-y-1">skill</span><br />
          to <span className="inline-block transition-transform duration-300 hover:translate-y-1">advance</span> your<br />
          <span className="inline-block transition-transform duration-300 hover:translate-x-2">career</span> path
        </h1>
        <p className={`text-gray-700 mb-8 max-w-md transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          Learning is a life long journey that in future we never find the 
          terming stop searching enjoy the process.
        </p>
        <div className={`flex space-x-4 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onMouseEnter={() => setHoverButton('getStarted')}
            onMouseLeave={() => setHoverButton(null)}
            onClick={handleGetStarted}
            className={`border-4 border-black shadow-[4px_4px0px#000] px-4 py-2 bg-red-400 font-semibold transition-all duration-300 ${hoverButton === 'getStarted' ? 'scale-110 -rotate-2' : 'scale-100 rotate-0'}`}>
            Get Started
          </button>
          <button 
            onMouseEnter={() => setHoverButton('watchDemo')}
            onMouseLeave={() => setHoverButton(null)}
            onClick={handleWatchDemo}
            className={`flex items-center space-x-2 bg-white text-black p-3 rounded-md border-4 border-black shadow-[4px_4px0px#000] px-4 py-2 font-semibold transition-all duration-300 ${hoverButton === 'watchDemo' ? 'scale-110 rotate-2' : 'scale-100 rotate-0'}`}>
            <Play size={20} className={`transition-transform duration-500 ${hoverButton === 'watchDemo' ? 'animate-pulse' : ''}`} />
            <span className="ml-2">Watch Demo</span>
          </button>
        </div>
      </div>

      <div className={`relative transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Decorative elements with animation */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full opacity-40 -z-10 transition-all duration-2000 ${animateImages ? 'scale-110' : 'scale-100'}`}></div>
        <div className={`absolute bottom-12 left-12 w-16 h-16 bg-yellow-500 rounded-full opacity-60 -z-10 transition-all duration-2000 ${animateImages ? 'scale-90' : 'scale-100'}`}></div>

        {/* Student images with hover and entrance animations */}
        <div className="relative w-full h-full flex justify-center items-center">
          <div 
            className={`bg-yellow-400 rounded-2xl p-2 shadow-lg absolute -left-4 top-12 z-10 transition-all duration-700 ease-in-out hover:rotate-12 hover:scale-105 ${isLoaded ? 'opacity-100 rotate-6' : 'opacity-0 -rotate-20'}`}>
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5" alt="Male student" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
          <div 
            className={`bg-pink-200 rounded-2xl p-2 shadow-lg absolute right-4 z-20 transition-all duration-700 ease-in-out delay-300 hover:rotate-3 hover:scale-105 ${isLoaded ? 'opacity-100 -rotate-3' : 'opacity-0 rotate-20'}`}>
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1531123414780-f74242c2b052" alt="Female student" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
          <div 
            className={`bg-blue-200 rounded-2xl p-2 shadow-lg absolute left-1/2 transform -translate-x-1/2 bottom-12 z-15 transition-all duration-700 ease-in-out delay-500 hover:-rotate-12 hover:scale-105 ${isLoaded ? 'opacity-100 rotate-12' : 'opacity-0 -rotate-45'}`}>
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Someone learning" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Animated curved arrow */}
        <div className={`absolute bottom-24 left-4 transform rotate-90 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${animateImages ? 'translate-x-4' : 'translate-x-0'}`}>
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
            <path d="M10 40 Q 52 10, 90 40 T 90 80" stroke="black" strokeWidth="2" fill="transparent" className="transition-all duration-1000" />
            <path d="M82 70 L 90 80 L 98 70" stroke="black" strokeWidth="2" fill="transparent" className={`transition-all duration-500 ${animateImages ? 'translate-y-1' : 'translate-y-0'}`} />
          </svg>
        </div>
      </div>

      {/* Demo Modal with animation */}
      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full animate-scaleIn">
            <h2 className="text-2xl font-bold mb-4">LearnX Platform Demo</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <p>Your demo video would go here</p>
              </div>
            </div>
            <button 
              onClick={() => setShowDemoModal(false)}
              className="bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500 transition-colors duration-300 hover:scale-105">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add keyframe animations to tailwind.css */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Home;