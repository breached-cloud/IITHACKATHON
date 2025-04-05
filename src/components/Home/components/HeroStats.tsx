
import React from "react";
import { motion } from "framer-motion";

const HeroStats: React.FC = () => {
  const stats = [
    { value: "500+", label: "Institutions" },
    { value: "25K+", label: "Active Users" },
    { value: "95%", label: "Satisfaction" }
  ];
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-8 md:gap-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
