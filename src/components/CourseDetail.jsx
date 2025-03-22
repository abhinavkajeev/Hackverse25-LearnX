import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const coursename = [
  {
    id: '1',
    title: 'Figma UI Design',
    instructor: 'Sarah',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.5k',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    description: 'Learn how to design beautiful user interfaces using Figma.',
  },
  {
    id: '2',
    title: 'Web Developer',
    instructor: 'Ray',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.2k',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    description: 'Become a full-stack web developer with this comprehensive course.',
  },
  {
    id: '3',
    title: 'Digital Marketing',
    instructor: 'Roy',
    rating: '⭐⭐⭐⭐⭐',
    price: '💲4.8k',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    description: 'Master the art of digital marketing and grow your business online.',
  },
];

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursename.find(course => course.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleStartLearning = () => {
    navigate(`/learn/${id}`);
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
        <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
        <p className="text-lg mb-4">{course.description}</p>
        <p className="text-sm mb-2">By {course.instructor} • {course.rating}</p>
        <p className="text-sm mb-6">{course.price}</p>
        
        {/* Added button to start learning */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleStartLearning}
            className="bg-red-400 text-white px-8 py-3 rounded-md font-medium hover:bg-red-500 transition-colors"
          >
            Start Learning
          </button>
          
          <p className="text-sm text-gray-600">
            Access premium course content by enrolling now
          </p>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;