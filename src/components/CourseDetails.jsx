import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseVideoPlayer from './CourseVideoPlayer';
import CourseSidebar from './CourseSidebar';
import ChatbotButton from './ChatbotButton'; // Import the new component

function CourseDetails() {
  const { id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Sample course data with sections and videos
  useEffect(() => {
    // This would be an API call in a real application
    const fetchCourse = () => {
      // Sample data - in a real app, this would come from your API
      const sampleCourse = {
        id: id,
        title: 'Figma UI Design Masterclass',
        instructor: 'Sarah Johnson',
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
          {
            id: 's2',
            title: 'Section 2: Step I - Problem formulation',
            duration: '30min',
            videos: [
              {
                id: 'v7',
                title: 'What is problem formulation?',
                duration: '5min',
                videoUrl: 'https://example.com/video7.mp4',
                completed: false
              },
              {
                id: 'v8',
                title: 'Steps in problem formulation',
                duration: '7min',
                videoUrl: 'https://example.com/video8.mp4',
                completed: false
              }
            ]
          },
          {
            id: 's3',
            title: 'Section 3: Step II - Problem structuring',
            duration: '30min',
            videos: [
              {
                id: 'v9',
                title: 'Breaking down complex problems',
                duration: '8min',
                videoUrl: 'https://example.com/video9.mp4',
                completed: false
              },
              {
                id: 'v10',
                title: 'Creating issue trees',
                duration: '10min',
                videoUrl: 'https://example.com/video10.mp4',
                completed: false
              }
            ]
          },
          {
            id: 's4',
            title: 'Section 4: Step III - Work prioritization and planning',
            duration: '15min',
            videos: [
              {
                id: 'v11',
                title: 'Prioritizing work streams',
                duration: '8min',
                videoUrl: 'https://example.com/video11.mp4',
                completed: false
              },
              {
                id: 'v12',
                title: 'Planning your approach',
                duration: '7min',
                videoUrl: 'https://example.com/video12.mp4',
                completed: false
              }
            ]
          }
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
    setIsPurchased(true);
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
            
            {!isPurchased && (
              <div className="mt-6">
                <button 
                  onClick={handlePurchaseCourse}
                  className="bg-red-400 text-white px-8 py-3 rounded-md font-medium hover:bg-red-500 transition-colors"
                >
                  Purchase Course
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