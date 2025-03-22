import React from 'react';
import { Play, ShoppingCart, User, Gift, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-2xl">Ubay</div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="font-medium border-b-2 border-yellow-500">Home</a>
          <a href="#" className="font-medium">Pages</a>
          <a href="#" className="font-medium">Courses</a>
          <a href="#" className="font-medium">Blog</a>
          <a href="#" className="font-medium">Shop</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <ShoppingCart size={20} />
          </button>
          <button className="p-2">
            <User size={20} />
          </button>
          <button className="bg-red-400 text-white px-4 py-2 rounded-md">
            Get A Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 relative">
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
            <button className="bg-red-400 text-white px-8 py-3 rounded-md font-medium">
              Get Started
            </button>
            <button className="flex items-center space-x-2 bg-black text-white p-3 rounded-md">
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
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-4 shadow-lg z-30">
              <div className="bg-white rounded-full p-2">
                <div className="text-center text-xs font-bold">
                  START TO<br />
                  EXPERIENCE
                </div>
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
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-yellow-400 rounded-3xl p-8 flex flex-col md:flex-row justify-between text-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-bold">200+</h2>
            <p>Experienced Tutors</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-bold">1200+</h2>
            <p>Students on our Platform</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">700+</h2>
            <p>Best free Classes</p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center mb-8">
          <h2 className="text-4xl font-bold mr-4">Most Popular Course</h2>
          <Gift size={32} className="text-red-500" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="bg-red-200 rounded-3xl p-4 overflow-hidden">
            <div className="bg-white rounded-2xl mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" alt="Content" className="w-full h-48 object-cover" />
            </div>
            <h3 className="font-bold text-lg">Figma UI Design</h3>
            <p className="text-sm">By Sarah • ⭐⭐⭐⭐⭐</p>
            <p className="text-sm">💲4.5k</p>
          </div>
          
          {/* Course Card 2 */}
          <div className="bg-red-200 rounded-3xl p-4 overflow-hidden">
            <div className="bg-white rounded-2xl mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8" alt="Web Design" className="w-full h-48 object-cover" />
            </div>
            <h3 className="font-bold text-lg">Web Developer</h3>
            <p className="text-sm">By Ray • ⭐⭐⭐⭐⭐</p>
            <p className="text-sm">💲4.2k</p>
          </div>
          
          {/* Course Card 3 */}
          <div className="bg-red-200 rounded-3xl p-4 overflow-hidden">
            <div className="bg-white rounded-2xl mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" alt="Marketing" className="w-full h-48 object-cover" />
            </div>
            <h3 className="font-bold text-lg">Digital Marketing</h3>
            <p className="text-sm">By Roy • ⭐⭐⭐⭐⭐</p>
            <p className="text-sm">💲4.8k</p>
          </div>
        </div>
      </section>
      
      {/* Mentor and Offer Sections */}
      <section className="container mx-auto px-6 py-8 grid md:grid-cols-2 gap-8">
        {/* Mentor Section */}
        <div className="bg-amber-100 rounded-3xl p-8 relative overflow-hidden">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-4">This Month's Best Mentor</h2>
            <p className="text-gray-700 mb-6">
              Learning is a life long journey that in future we never find the 
              terming stop searching enjoy the process.
            </p>
            <button className="bg-red-400 text-white px-6 py-2 rounded-md">
              Explore Now
            </button>
          </div>
          
          <div className="absolute right-0 bottom-0 w-64 h-64">
            <div className="bg-green-200 rounded-tl-3xl overflow-hidden w-full h-full">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" alt="Mentor" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Offer Section */}
        <div className="bg-amber-100 rounded-3xl p-8 relative overflow-hidden">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-4">Today's Best Offer</h2>
            <p className="text-gray-700 mb-6">
              Life long journey that in future we never find 
              stop searching enjoy the process.
            </p>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md">
              View Offers
            </button>
          </div>
          
          <div className="absolute right-0 bottom-0 w-48 h-48">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8" alt="Books" className="w-full h-full object-cover rounded-tl-3xl" />
              <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-full p-2 rotate-12">
                <div className="text-xs font-bold">
                  UP TO<br />
                  60%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="container mx-auto px-6 py-12 mb-8">
        <div className="bg-red-400 rounded-3xl p-8">
          <h2 className="text-4xl font-bold text-center mb-4">Newsletter</h2>
          <p className="text-center mb-8 text-white">
            Honestly Good E Mails, We Swear! Receive Offers,<br />
            Update, Tips And Exclusive Invites.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <input 
              type="text" 
              placeholder="First Name" 
              className="p-3 rounded border border-gray-300"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="p-3 rounded border border-gray-300"
            />
            <div className="md:col-span-3 flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="p-3 rounded-l flex-grow border border-gray-300" 
              />
              <button className="bg-white px-6 py-3 rounded-r">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;