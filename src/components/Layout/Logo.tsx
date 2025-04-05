
import React, { useState } from "react";
import { BookOpen, Eye } from "lucide-react";

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Logo content - E with book integration */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="text-white font-bold text-lg">E</span>
        <BookOpen 
          size={10} 
          className={`absolute text-white/80 transition-all duration-300 ${isHovered ? 'scale-125 opacity-100' : 'opacity-70'}`} 
          style={{ top: '60%', left: '50%', transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.25)' : 'scale(1)'}` }}
        />
      </div>
      
      {/* Spectacles for E */}
      <div className={`absolute top-[45%] left-0 w-full transition-transform duration-300 ${isHovered ? 'transform -translate-y-0.5' : ''}`}>
        <div className={`w-full h-[1.5px] bg-white flex items-center transition-all duration-300 ${isHovered ? 'h-[2px]' : ''}`}>
          <div className={`w-2.5 h-2.5 rounded-full border border-white bg-transparent absolute -left-0.5 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-white/10' : ''}`}></div>
          <div className={`w-2.5 h-2.5 rounded-full border border-white bg-transparent absolute -right-0.5 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-white/10' : ''}`}></div>
        </div>
      </div>
      
      {/* Eye accent */}
      <div className={`absolute -bottom-2 -right-2 text-white transition-all duration-300 ${isHovered ? 'opacity-90 transform scale-110' : 'opacity-40'}`}>
        <Eye size={14} className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
      </div>
    </div>
  );
};

export default Logo;
