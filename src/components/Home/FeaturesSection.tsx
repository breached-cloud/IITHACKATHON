
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./components/SectionTitle";
import FeaturesGrid from "./components/FeaturesGrid";
import { CheckCircle, BookOpen, Users, BarChart2, BookMarked, PenTool } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturesSection: React.FC = () => {
  // Features data
  const features: Feature[] = [
    {
      id: 1,
      title: "Interactive 3D Models",
      description: "Explore complex concepts through interactive 3D models that bring learning to life.",
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      id: 2,
      title: "Personalized Learning Paths",
      description: "Get customized learning experiences based on your unique needs and learning style.",
      icon: <BarChart2 className="w-6 h-6 text-green-500" />
    },
    {
      id: 3,
      title: "Collaborative Learning",
      description: "Connect with peers and instructors in real-time for enhanced learning experiences.",
      icon: <Users className="w-6 h-6 text-purple-500" />
    },
    {
      id: 4,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and performance metrics.",
      icon: <CheckCircle className="w-6 h-6 text-cyan-500" />
    },
    {
      id: 5,
      title: "Rich Course Library",
      description: "Access a vast library of courses across various subjects and disciplines.",
      icon: <BookMarked className="w-6 h-6 text-amber-500" />
    },
    {
      id: 6,
      title: "Interactive Assessments",
      description: "Test your knowledge with engaging quizzes and adaptive assessment tools.",
      icon: <PenTool className="w-6 h-6 text-pink-500" />
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle 
            title="Powerful Learning Features" 
            description="Discover the tools that make learning more engaging, effective, and enjoyable."
          />
        </motion.div>
        
        <FeaturesGrid features={features} />
      </div>
    </section>
  );
};

export default FeaturesSection;
