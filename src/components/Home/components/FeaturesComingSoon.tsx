
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesComingSoon: React.FC = () => {
  return (
    <motion.div 
      className="mt-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 mb-6">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">Coming Soon</span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        More powerful features on the way
      </h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
        We're constantly improving and expanding our platform capabilities. 
        Stay tuned for new features that will further transform your educational experience.
      </p>
      
      <Button className="group">
        View our roadmap
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
};

export default FeaturesComingSoon;
