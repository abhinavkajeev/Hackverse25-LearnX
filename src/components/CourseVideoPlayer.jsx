// CourseVideoPlayer.jsx
import React, { useState } from 'react';

function CourseVideoPlayer({ videoUrl, title, isLocked }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLocked) {
    return (
      <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-bold mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 animate-pulse text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <div className="animate-bounce">
              Please Purchase the course to access the content
            </div>
          </div>
          <button className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1">
            Buy Course
          </button>
          <div className="absolute -z-10 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
        </div>
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl relative">
        {/* Video playing animation overlay */}
        {isPlaying && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1 rounded-full z-10">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        )}
        <video 
          className="w-full h-full object-cover" 
          controls
          src={videoUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div className={`h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${isPlaying ? 'animate-progressBar' : ''}`}></div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600">
          {isPlaying ? (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Now Playing
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              Click to Play
            </span>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progressBar {
          animation: progressBar 30s linear;
        }
      `}</style>
    </div>
  );
}

export default CourseVideoPlayer;
