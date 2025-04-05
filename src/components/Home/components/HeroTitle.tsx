
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroTitleProps {
  textHighlighted?: boolean;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ textHighlighted = false }) => {
  return (
    <>
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Transform Your{" "}
        <div className="relative inline-block">
          <span 
            className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 ${
              textHighlighted ? 'animate-pulse' : ''
            }`}
          >
            Educational
          </span>
          <Sparkles 
            className={`absolute -top-5 -right-5 h-6 w-6 text-yellow-400 ${
              textHighlighted ? 'opacity-100 animate-bounce' : 'opacity-0'
            } transition-opacity duration-300`} 
          />
        </div>{" "}
        <br className="lg:hidden" />
        Experience
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Discover a next-generation learning platform that combines interactive 3D models, personalized content, and powerful collaboration tools.
      </motion.p>
    </>
  );
};

export default HeroTitle;
