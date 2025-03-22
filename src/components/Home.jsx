import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  const handleGetStarted = () => {
    navigate('/courses'); // Navigate to courses page
  };
  
  const handleWatchDemo = () => {
    setShowDemoModal(true);
  };

  return (
    <section className="bg-[#ffebd6] container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 relative">
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Build your skill<br />
          to advance your<br />
          career path
        </h1>
        <p className="text-gray-700 mb-8 max-w-md">
          Learning is a life long journey that in future we never find the 
          terming stop searching enjoy the process.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={handleGetStarted}
            className="border-4 border-black shadow-[4px_4px0px#000] px-4 py-2 bg-red-400 font-semibold hover:scale-105 transition-transform duration-200">
            Get Started
          </button>
          <button 
            onClick={handleWatchDemo}
            className="flex items-center space-x-2 bg-white text-black p-3 rounded-md border-4 border-black shadow-[4px_4px0px#000] px-4 py-2 font-semibold hover:scale-105 transition-transform duration-200">
            <Play size={20} />
            <span className="ml-2">Watch Demo</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full opacity-40 -z-10"></div>
        <div className="absolute bottom-12 left-12 w-16 h-16 bg-yellow-500 rounded-full opacity-60 -z-10"></div>

        {/* Student images */}
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="bg-yellow-400 rounded-2xl p-2 rotate-6 shadow-lg absolute -left-4 top-12 z-10">
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5" alt="Male student" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-pink-200 rounded-2xl p-2 -rotate-3 shadow-lg absolute right-4 z-20">
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1531123414780-f74242c2b052" alt="Female student" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-blue-200 rounded-2xl p-2 rotate-12 shadow-lg absolute left-1/2 transform -translate-x-1/2 bottom-12 z-15">
            <div className="bg-white rounded-xl overflow-hidden w-48 h-48">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Someone learning" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Curved arrow */}
        <div className="absolute bottom-24 left-4 transform rotate-90">
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
            <path d="M10 40 Q 52 10, 90 40 T 90 80" stroke="black" strokeWidth="2" fill="transparent" />
            <path d="M82 70 L 90 80 L 98 70" stroke="black" strokeWidth="2" fill="transparent" />
          </svg>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">LearnX Platform Demo</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              {/* Replace with your actual demo video */}
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <p>Your demo video would go here</p>
                {/* For actual implementation:
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/your-video-id" 
                  title="LearnX Demo" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                */}
              </div>
            </div>
            <button 
              onClick={() => setShowDemoModal(false)}
              className="bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;