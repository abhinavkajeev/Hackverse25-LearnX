import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseVideoPlayer from './CourseVideoPlayer';
import CourseSidebar from './CourseSidebar';
import ChatbotButton from './ChatbotButton';
import MetaMaskPurchase from './MetaMaskPurchase'; // Import the new component

function CourseDetails() {
  const { id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Sample course data with sections and videos
  useEffect(() => {
    // This would be an API call in a real application
    const fetchCourse = () => {
      // Sample data - in a real app, this would come from your API
      const sampleCourse = {
        id: id,
        title: 'Figma UI Design Masterclass',
        instructor: 'Sarah Johnson',
        price: 0.05, // Added price in ETH
        sections: [
          {
            id: 's1',
            title: 'Section 1: Introduction to structured problem solving',
            duration: '30min',
            videos: [
              {
                id: 'v1',
                title: 'Administrative information',
                duration: '4min',
                videoUrl: 'https://example.com/video1.mp4',
                completed: true
              },
              {
                id: 'v2',
                title: 'Why structure problem solving at all?',
                duration: '4min',
                videoUrl: 'https://example.com/video2.mp4',
                completed: false
              },
              {
                id: 'v3',
                title: 'Who is an expert?',
                duration: '6min',
                videoUrl: 'https://example.com/video3.mp4',
                completed: false
              },
              {
                id: 'v4',
                title: 'Why use hypothesis based problem solving (HBPS)?',
                duration: '4min',
                videoUrl: 'https://example.com/video4.mp4',
                completed: false
              },
              {
                id: 'v5',
                title: 'Steps of HBPS',
                duration: '6min',
                videoUrl: 'https://example.com/video5.mp4',
                completed: false
              },
              {
                id: 'v6',
                title: 'Quiz 1: HBPS basics',
                duration: '6min',
                videoUrl: 'https://example.com/video6.mp4',
                completed: false
              }
            ]
          },
          // ... other sections remain the same
        ]
      };

      setCourse(sampleCourse);
      
      // Set the first video as current by default
      if (sampleCourse.sections.length > 0 && sampleCourse.sections[0].videos.length > 0) {
        setCurrentVideo(sampleCourse.sections[0].videos[0]);
      }
      
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  const handlePurchaseCourse = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseComplete = () => {
    setIsPurchased(true);
    setShowPurchaseModal(false);
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6 relative">
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full">
            <button 
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <MetaMaskPurchase 
              courseId={id}
              courseTitle={course.title}
              price={course.price}
              onPurchaseComplete={handlePurchaseComplete}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Video Player */}
        <div className="lg:w-2/3">
          <CourseVideoPlayer 
            videoUrl={currentVideo?.videoUrl} 
            title={currentVideo?.title}
            isLocked={!isPurchased} 
          />
          
          {/* Course title and info */}
          <div className="mt-8 mb-12">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-4">Instructor: {course.instructor}</p>
            <p className="text-xl font-semibold text-indigo-600 mb-6">{course.price} ETH</p>
            
            {!isPurchased && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handlePurchaseCourse}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.9582 1L19.8241 10.7183L22.2103 5.09902L32.9582 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.04175 1L15.0987 10.809L12.7866 5.09902L2.04175 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fill="white" d="M28.2365 23.5466L24.7985 28.8816L32.2675 30.9315L34.4484 23.6536L28.2365 23.5466Z"/>
                  </svg>
                  Purchase with MetaMask
                </button>
                
                <button 
                  onClick={() => setIsPurchased(true)}
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Regular Purchase
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Course Sidebar */}
        <div className="lg:w-1/3">
          <CourseSidebar 
            sections={course.sections} 
            onSelectVideo={handleVideoSelect} 
            currentVideoId={currentVideo?.id}
            isPurchased={isPurchased}
          />
        </div>
      </div>
      
      {/* Chatbot Button Component */}
      <ChatbotButton 
        isPurchased={isPurchased} 
        courseId={id}
        courseTitle={course.title}
      />
    </div>
  );
}

export default CourseDetails;