
import React, { useState } from "react";
import ModelShowcase from "@/components/3D/ModelShowcase";
import BookshelfViewer from "@/components/3D/BookshelfViewer";
import SectionTitle from "./components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThreeDModelsSection: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  // Enhanced model descriptions with updated colors and themed content
  const models = [
    {
      title: "Interactive Biology Module",
      description: "Explore the fascinating world of cells, DNA, and biological systems through immersive 3D visualizations that respond to your touch.",
      modelType: "biology",
      color: "#10b981",
      ctaText: "Explore Biology",
      splineScene: "https://prod.spline.design/uo38MQj-RE98uAZP/scene.splinecode" // Custom biology scene
    },
    {
      title: "Physics Simulations",
      description: "Experience the laws of physics through stunning 3D simulations. Manipulate forces, observe particle behaviors, and unlock scientific mysteries.",
      modelType: "physics",
      color: "#8b5cf6",
      ctaText: "Try Simulations"
    },
    {
      title: "3D Programming Concepts",
      description: "Visualize abstract coding concepts in an immersive 3D space. Watch algorithms come to life and interact with data structures in real-time.",
      modelType: "programming", 
      color: "#f59e0b",
      ctaText: "Learn Coding"
    },
    {
      title: "Digital Library Access",
      description: "Browse our extensive collection of interactive educational resources. Find materials tailored to your learning style and academic interests.",
      modelType: "abstract",
      color: "#3b82f6",
      ctaText: "Browse Library"
    }
  ];
  
  // Define animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Define animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };
  
  // Display models based on expanded state
  const visibleModels = expanded ? models : models.slice(0, 4);
  
  return (
    <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced background decorative elements */}
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "0.75s"}}></div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionTitle 
            title="Interactive 3D Learning Models"
            description="Engage with cutting-edge 3D models that bring abstract concepts to life. Click and interact with each model to explore unique educational experiences."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {visibleModels.map((model, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover="hover"
                className="h-full"
              >
                {index === 0 ? (
                  <ModelShowcase
                    title={model.title}
                    description={model.description}
                    modelType={model.modelType as 'biology' | 'physics' | 'programming' | 'abstract'}
                    color={model.color}
                    ctaText={model.ctaText}
                    ctaAction={() => navigate("/courses")}
                    splineScene={model.splineScene}
                    className="h-full"
                    height="320px"
                  />
                ) : (
                  <ModelShowcase
                    title={model.title}
                    description={model.description}
                    modelType={model.modelType as 'biology' | 'physics' | 'programming' | 'abstract'}
                    color={model.color}
                    ctaText={model.ctaText}
                    ctaAction={() => navigate("/courses")}
                    className="h-full"
                    height="320px"
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Show more/less button */}
          {models.length > 4 && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline"
                onClick={() => setExpanded(!expanded)}
                className="group"
              >
                {expanded ? (
                  <>Show Less <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDModelsSection;
