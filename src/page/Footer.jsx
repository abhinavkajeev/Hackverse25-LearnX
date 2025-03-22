    import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

    function Footer() {
    return (
        <footer className="bg-[#333] text-white py-12">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-4">About LearnX</h3>
                <p className="text-gray-400">
                LearnX is your gateway to lifelong learning. Build your skills and advance your career with our comprehensive courses.
                </p>
            </div>

            {/* Quick Links */}
            <div className="mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Courses</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
            </div>

            {/* Social Media */}
            <div className="mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                    <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                    <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                    <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                    <Linkedin size={24} />
                </a>
                </div>
            </div>

            {/* Newsletter */}
            <div>
                <h3 className="text-xl font-bold mb-4">Subscribe</h3>
                <p className="text-gray-400 mb-4">
                Stay updated with our latest courses and offers.
                </p>
                <form className="flex">
                <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-700 text-white p-2 rounded-l-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 rounded-r-md hover:bg-red-600"
                >
                    Subscribe
                </button>
                </form>
            </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LearnX. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
    }

    export default Footer;