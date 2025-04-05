
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesGridProps {
  features: Feature[];
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => {
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (index + 1) }}
        >
          <FeatureCard 
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
