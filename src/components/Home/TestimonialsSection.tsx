
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./components/SectionTitle";
import { cn } from "@/lib/utils";
import { UserCircle } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "EduNexus has completely transformed how I approach my studies. The interactive 3D models make complex concepts so much easier to understand!",
    name: "Sarah Johnson",
    title: "Computer Science Student",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5
  },
  {
    id: 2,
    content: "As a professor, I've seen a remarkable improvement in student engagement since incorporating EduNexus in my lectures.",
    name: "Dr. Robert Chen",
    title: "Biology Professor",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 5
  },
  {
    id: 3,
    content: "The personalized learning paths have helped me identify and strengthen my weak areas. My grades have improved significantly!",
    name: "Michael Rodriguez",
    title: "Engineering Student",
    avatar: "https://i.pravatar.cc/150?img=62",
    rating: 4
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="What Our Users Say" 
          description="Discover how EduNexus is transforming education for students and educators worldwide."
        />
        
        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  // Define card styling without gradients
  const cardStyles = cn(
    "relative p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col",
    "bg-white dark:bg-gray-800",
  );

  return (
    <motion.div 
      className={cardStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * (index + 1) }}
    >
      {/* Star rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
      
      {/* Testimonial content */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">"{testimonial.content}"</p>
      
      {/* User info */}
      <div className="flex items-center mt-auto">
        {testimonial.avatar ? (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-10 h-10 rounded-full mr-4"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
            <UserCircle className="w-6 h-6 text-cyan-600" />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
