
import React from "react";

const HeroEducationElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Educational elements as decorations */}
      <div className="absolute top-1/4 right-[15%] opacity-20 dark:opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#3B82F6" strokeWidth="2" />
          <text x="40" y="65" fontFamily="monospace" fontSize="16" fill="#3B82F6">E=mc²</text>
          <path d="M30 80 Q 60 40 90 80" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 left-[10%] opacity-20 dark:opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" stroke="#10B981" strokeWidth="2" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#10B981" strokeWidth="1.5" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" stroke="#10B981" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      
      <div className="absolute top-2/3 right-[20%] opacity-20 dark:opacity-10">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40 C 40 10, 80 10, 110 40 C 80 70, 40 70, 10 40" stroke="#8B5CF6" strokeWidth="2" fill="none" />
          <circle cx="60" cy="40" r="5" fill="#8B5CF6" />
          <text x="40" y="65" fontFamily="monospace" fontSize="12" fill="#8B5CF6">f(x)=∫</text>
        </svg>
      </div>
      
      <div className="absolute top-1/3 left-[20%] opacity-20 dark:opacity-10">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80 L 60 20 L 100 80 Z" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <text x="45" y="60" fontFamily="monospace" fontSize="14" fill="#F59E0B">α=60°</text>
          <line x1="60" y1="20" x2="60" y2="80" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroEducationElements;
