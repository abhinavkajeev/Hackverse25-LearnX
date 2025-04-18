import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const navigate = useNavigate();
  const [hoveredCourse, setHoveredCourse] = useState(null);

  // Sample course data
  const courses = [
    {
      id: '1',
      title: 'Figma UI Design',
      instructor: 'Sarah',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.5k',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      description: 'Learn how to create stunning UI designs with Figma from scratch',
    },
    {
      id: '2',
      title: 'Web Developer',
      instructor: 'Ray',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.2k',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
      description: 'Become a full-stack web developer and build responsive websites',
    },
    {
      id: '3',
      title: 'Digital Marketing',
      instructor: 'Roy',
      rating: '⭐⭐⭐⭐⭐',
      price: '💲4.8k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      description: 'Master SEO, social media marketing, and digital advertising strategies',
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
            className="relative bg-red-200 rounded-3xl p-4 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => navigate(`/courses/${course.id}`)}
            onMouseEnter={() => setHoveredCourse(course.id)}
            onMouseLeave={() => setHoveredCourse(null)}
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

            {/* Pop-up card on hover */}
            {hoveredCourse === course.id && (
              <div className="absolute inset-0 bg-white bg-opacity-90 rounded-3xl p-6 flex flex-col justify-center items-center transform transition-all duration-300 shadow-2xl">
                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                <p className="text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-semibold">Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-semibold">Rating:</span>
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="font-semibold">Price:</span>
                  <span>{course.price}</span>
                </div>
                <button className="bg-red-500 text-white py-2 px-6 rounded-full font-bold hover:bg-red-600 transition-colors">
                  Enroll Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;