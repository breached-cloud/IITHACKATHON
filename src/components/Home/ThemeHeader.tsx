
import React, { useState } from "react";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";
import { Eye } from "lucide-react";

const ThemeHeader: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div 
            className="h-10 w-10 bg-white rounded-full border-2 border-white flex items-center justify-center mr-2 shadow-md relative overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-elearn-primary font-bold text-lg">E</span>
            {/* Spectacles for E */}
            <div className={`absolute top-[45%] left-0 w-full transition-transform duration-300 ${isHovered ? 'transform -translate-y-0.5' : ''}`}>
              <div className={`w-full h-[1.5px] bg-elearn-primary flex items-center transition-all duration-300 ${isHovered ? 'h-[2px]' : ''}`}>
                <div className={`w-2.5 h-2.5 rounded-full border border-elearn-primary bg-transparent absolute -left-0.5 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-elearn-primary/10' : ''}`}></div>
                <div className={`w-2.5 h-2.5 rounded-full border border-elearn-primary bg-transparent absolute -right-0.5 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-elearn-primary/10' : ''}`}></div>
              </div>
            </div>
            {/* Eye accent */}
            <div className={`absolute -bottom-2 -right-2 text-elearn-primary transition-all duration-300 ${isHovered ? 'opacity-90 transform scale-110' : 'opacity-40'}`}>
              <Eye size={14} className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-white">EduNexus</h1>
        </div>
        <div className="glass px-2 py-1 rounded-full">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default ThemeHeader;
