
import React from "react";

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/20 blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-300/20 to-blue-300/10 blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiNCQkJCQkIiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDAiLz48L2c+PC9zdmc+')] opacity-[0.03] dark:opacity-[0.02]"
      ></div>
      
      {/* Gradient overlay at the top for smooth text contrast */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80"></div>
    </div>
  );
};

export default HeroBackground;
