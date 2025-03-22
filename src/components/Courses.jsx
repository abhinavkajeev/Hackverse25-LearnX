import React from 'react';
import { Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const navigate = useNavigate();

  // Sample course data
  const courses = [
    {
      id: '1',
      title: 'Figma UI Design',
      instructor: 'Sarah',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.5k',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    },
    {
      id: '2',
      title: 'Web Developer',
      instructor: 'Ray',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.2k',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    },
    {
      id: '3',
      title: 'Digital Marketing',
      instructor: 'Roy',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.8k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <h2 className="text-4xl font-bold mr-4">Most Popular Course</h2>
        <Gift size={32} className="text-red-500" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-red-200 rounded-3xl p-4 overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/courses/${course.id}`)} // Fixed string template syntax
          >
            <div className="bg-white rounded-2xl mb-4 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{course.title}</h3>
            <p className="text-sm">By {course.instructor} • {course.rating}</p>
            <p className="text-sm">{course.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;