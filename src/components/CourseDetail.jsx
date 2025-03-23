import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, Medal, BookOpen } from 'lucide-react';

const coursename = [
  {
    id: '1',
    title: 'Figma UI Design',
    instructor: 'Sarah',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.5k',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    description: 'Learn how to design beautiful user interfaces using Figma.',
    duration: '12 weeks',
    students: '2,450+',
    level: 'Beginner to Advanced'
  },
  {
    id: '2',
    title: 'Web Developer',
    instructor: 'Ray',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.2k',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    description: 'Become a full-stack web developer with this comprehensive course.',
    duration: '16 weeks',
    students: '3,120+',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Digital Marketing',
    instructor: 'Roy',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.8k',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    description: 'Master the art of digital marketing and grow your business online.',
    duration: '10 weeks',
    students: '1,890+',
    level: 'All Levels'
  },
];

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursename.find(course => course.id === id);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleStartLearning = () => {
    navigate(`/learn/${id}`);
  };

  return (
    <section className="container mx-auto px-6 py-12 overflow-hidden">
      <div 
        className={`bg-white rounded-3xl p-8 shadow-lg transform transition-all duration-700 ease-out
                   ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      >
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <img 
            src={course.image} 
            alt={course.title} 
            className={`w-full h-64 object-cover transition-transform duration-700 ease-out
                       ${isVisible ? 'scale-100' : 'scale-110'}`} 
          />
          <div className={`absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold
                         transform transition-all duration-500 delay-300
                         ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
            {course.price}
          </div>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 transition-all duration-500 delay-200
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {course.title}
        </h2>
        
        <p className={`text-lg mb-6 transition-all duration-500 delay-300
                     ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {course.description}
        </p>
        
        <div className={`flex items-center mb-2 transition-all duration-500 delay-400
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <img 
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${course.instructor}`} 
            alt={course.instructor}
            className="w-12 h-12 rounded-full mr-4 border-2 border-red-300" 
          />
          <div>
            <p className="font-medium">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-600">{course.rating}</p>
          </div>
        </div>
        
        <div className={`grid grid-cols-3 gap-4 mb-8 transition-all duration-500 delay-500
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <Clock size={20} className="text-red-500 mr-2" />
            <span className="text-sm">{course.duration}</span>
          </div>
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <BookOpen size={20} className="text-red-500 mr-2" />
            <span className="text-sm">{course.students}</span>
          </div>
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <Medal size={20} className="text-red-500 mr-2" />
            <span className="text-sm">{course.level}</span>
          </div>
        </div>
        
        <div className={`flex justify-between items-center transition-all duration-500 delay-600
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={handleStartLearning}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className="bg-red-400 text-white px-8 py-3 rounded-full font-medium hover:bg-red-500 transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Start Learning 
              <ArrowRight 
                size={18} 
                className={`ml-2 transform transition-transform duration-300 ease-out ${buttonHover ? 'translate-x-1' : ''}`} 
              />
            </span>
            <span 
              className={`absolute top-0 left-0 w-full h-full bg-red-500 transform transition-transform duration-500 origin-left
                        ${buttonHover ? 'scale-x-100' : 'scale-x-0'}`}
            ></span>
          </button>
          
          <p className={`text-sm text-gray-600 max-w-xs transition-all duration-300
                       ${buttonHover ? 'translate-x-2' : ''}`}>
            Access premium course content by enrolling now
          </p>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;