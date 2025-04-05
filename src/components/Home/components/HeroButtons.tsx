
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroButtons: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Button 
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white group"
        onClick={() => navigate("/signup")}
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
      
      <Button 
        variant="outline" 
        size="lg"
        className="border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        onClick={() => {
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        }}
      >
        <Play className="mr-2 h-4 w-4 fill-current" />
        Watch Demo
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
