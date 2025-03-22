import { User, BookOpen, Award } from 'lucide-react';

function About() {
    return (
      <section className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We are dedicated to helping you build your skills and advance your career through high-quality courses and expert mentorship. Our mission is to make learning accessible and enjoyable for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1: Our Mission */}
        <div className="bg-amber-100 rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-400 rounded-full p-4">
              <User size={32} className="text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To empower individuals with the knowledge and skills they need to succeed in their careers and personal growth.
          </p>
        </div>

        {/* Card 2: What We Offer */}
        <div className="bg-amber-100 rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 rounded-full p-4">
              <BookOpen size={32} className="text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">What We Offer</h3>
          <p className="text-gray-700">
            A wide range of courses, expert mentorship, and hands-on projects to help you achieve your goals.
          </p>
        </div>

        {/* Card 3: Our Achievements */}
        <div className="bg-amber-100 rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-400 rounded-full p-4">
              <Award size={32} className="text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Our Achievements</h3>
          <p className="text-gray-700">
            Over 10,000 students trained, 500+ courses, and a 95% satisfaction rate from our learners.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <button className="bg-red-400 text-white px-8 py-3 rounded-md font-medium">
          Learn More About Us
        </button>
      </div>
    </section>
    )
  }
  
  export default About;
  