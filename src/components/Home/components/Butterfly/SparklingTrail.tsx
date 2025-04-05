
import React, { useEffect, useState } from "react";

const SparklingTrail: React.FC = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; size: number; delay: number; left: number; opacity: number }>>([]);
  
  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 0.5 + 0.3, // Size between 0.3-0.8rem
      delay: Math.random() * 2, // Random delay for animation
      left: Math.random() * 100 - 50, // Position from -50% to 50%
      opacity: Math.random() * 0.7 + 0.3 // Opacity between 0.3-1
    }));
    
    setSparkles(initialSparkles);
    
    // Optional: Regenerate sparkles periodically
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(spark => ({
        ...spark,
        delay: Math.random() * 2,
        left: Math.random() * 100 - 50,
        opacity: Math.random() * 0.7 + 0.3
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 pointer-events-none overflow-hidden">
      {sparkles.map(spark => (
        <div 
          key={spark.id}
          className="absolute animate-float-upward bg-white rounded-full"
          style={{
            width: `${spark.size}rem`,
            height: `${spark.size}rem`,
            bottom: 0,
            left: `calc(50% + ${spark.left}%)`,
            opacity: spark.opacity,
            animationDelay: `${spark.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default SparklingTrail;
