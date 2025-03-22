import React from 'react';

function CourseVideoPlayer({ videoUrl, title, isLocked }) {
  if (isLocked) {
    return (
      <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-bold mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Please Purchase the course to access the content
          </div>
          <button className="bg-red-400 text-white px-6 py-2 rounded-md font-medium hover:bg-red-500 transition-colors">
            Buy Course
          </button>
        </div>
        <div className="w-full h-full bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        {/* Replace with actual video component */}
        <video 
          className="w-full h-full object-cover" 
          controls
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
    </div>
  );
}

export default CourseVideoPlayer;