
import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollIndicatorProps {
  scrolled: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrolled }) => {
  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
