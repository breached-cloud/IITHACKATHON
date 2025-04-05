
import React from "react";

interface SectionTitleProps {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  description, 
  align = "center", 
  className = "" 
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto"
  };

  return (
    <div className={`max-w-3xl ${alignmentClasses[align]} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
