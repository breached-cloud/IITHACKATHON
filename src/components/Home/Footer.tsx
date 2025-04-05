
import React from "react";
import { Github, Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="about" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pravaah-primary to-pravaah-secondary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-xl font-montserrat font-bold text-pravaah-primary dark:text-white">EduNexus</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transforming education through intuitive and engaging online learning experiences. Our platform connects educators, students, and administrators in one seamless ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pravaah-primary dark:hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pravaah-primary dark:hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pravaah-primary dark:hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pravaah-primary dark:hover:text-white">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pravaah-primary dark:hover:text-white">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Features</a></li>
              <li><a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">For Schools</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">For Universities</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">For Corporate Training</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">For Educators</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">For Students</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-pravaah-primary mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">123 Education Street, Learning City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pravaah-primary mr-2" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-pravaah-primary mr-2" />
                <span className="text-gray-600 dark:text-gray-400">contact@edunexus.edu</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pravaah-primary dark:bg-gray-800 dark:text-white"
                />
                <button 
                  type="submit"
                  className="bg-pravaah-primary hover:bg-pravaah-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} EduNexus Learning Technologies. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-pravaah-primary dark:hover:text-white transition-colors">Terms of Service</a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
