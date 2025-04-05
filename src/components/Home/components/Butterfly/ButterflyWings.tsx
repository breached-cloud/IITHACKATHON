
import React from "react";

interface WingProps {
  isFluttering: boolean;
  side: "left" | "right";
}

const ButterflyWings: React.FC<WingProps> = ({ isFluttering, side }) => {
  const isLeft = side === "left";
  const rotation = isLeft 
    ? (isFluttering ? 'rotate-[-20deg]' : 'rotate-[-5deg]')
    : (isFluttering ? 'rotate-[20deg]' : 'rotate-[5deg]');
  
  const gradientDirection = isLeft ? "to-br" : "to-bl";
  const gradientDirectionLower = isLeft ? "from-purple-500 via-pink-400 to-blue-400" : "from-purple-500 via-pink-400 to-blue-400";
  const roundedCorners = isLeft 
    ? "rounded-tl-[80%] rounded-bl-[40%] rounded-tr-[80%] rounded-br-[40%]" 
    : "rounded-tr-[80%] rounded-br-[40%] rounded-tl-[80%] rounded-bl-[40%]";
  const roundedCornersLower = isLeft 
    ? "rounded-tl-[40%] rounded-bl-[80%] rounded-tr-[40%] rounded-br-[80%]"
    : "rounded-tr-[40%] rounded-br-[80%] rounded-tl-[40%] rounded-bl-[80%]";
  const marginDirection = isLeft ? "-ml-2" : "-mr-2";
  
  const svgPath = isLeft 
    ? "M30,20 Q50,40 30,60" 
    : "M70,20 Q50,40 70,60";
  const svgPathLower = isLeft 
    ? "M30,20 Q40,50 20,70" 
    : "M70,20 Q60,50 80,70";
  
  const detailPosition = isLeft ? "left" : "right";

  return (
    <div className={`absolute top-1/2 ${isLeft ? 'left-0' : 'right-0'} -translate-y-1/2 ${rotation} transition-transform duration-200`}>
      {/* Upper Wing */}
      <div 
        className={`w-12 h-10 bg-gradient-to-${gradientDirection} from-blue-400 via-purple-400 to-pink-400 ${roundedCorners} shadow-md relative overflow-hidden ${marginDirection}`}
      >
        {/* Wing patterns */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
          <div className="absolute top-1/4 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          <div className="absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          <div className="absolute top-3/4 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          
          <div className={`absolute ${detailPosition}-1/4 top-1/4 w-1 h-1 rounded-full bg-white/60`}></div>
          <div className={`absolute ${detailPosition}-1/3 top-1/2 w-1.5 h-1.5 rounded-full bg-white/60`}></div>
          <div className={`absolute ${detailPosition}-1/4 top-3/4 w-1 h-1 rounded-full bg-white/60`}></div>
        </div>
        
        {/* Wing glitter effect */}
        <div className="absolute inset-0 bg-white/5">
          <div className={`absolute ${isLeft ? 'right' : 'left'}-1 top-1 w-1 h-1 rounded-full bg-white animate-pulse`}></div>
          <div className={`absolute ${isLeft ? 'right' : 'left'}-3 top-3 w-0.5 h-0.5 rounded-full bg-white animate-pulse delay-300`}></div>
          <div className={`absolute ${isLeft ? 'left' : 'right'}-1 bottom-2 w-0.5 h-0.5 rounded-full bg-white animate-pulse delay-150`}></div>
        </div>
      </div>
      
      {/* Lower Wing */}
      <div 
        className={`w-10 h-12 bg-gradient-to-${gradientDirection} ${gradientDirectionLower} ${roundedCornersLower} shadow-md relative overflow-hidden mt-[-5px] ${marginDirection}`}
      >
        {/* Wing patterns */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
          <div className="absolute top-1/4 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          <div className="absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          <div className="absolute top-3/4 left-1/4 right-1/4 h-[1px] bg-white/40"></div>
          
          <div className={`absolute ${detailPosition}-1/4 top-1/4 w-1.5 h-1.5 rounded-full bg-white/60`}></div>
          <div className={`absolute ${detailPosition}-1/3 top-1/2 w-2 h-2 rounded-full bg-white/60`}></div>
          <div className={`absolute ${detailPosition}-1/4 top-3/4 w-1.5 h-1.5 rounded-full bg-white/60`}></div>
        </div>
        
        {/* Wing glitter effect */}
        <div className="absolute inset-0 bg-white/5">
          <div className={`absolute ${isLeft ? 'right' : 'left'}-2 top-2 w-1 h-1 rounded-full bg-white animate-pulse delay-500`}></div>
          <div className={`absolute ${isLeft ? 'right' : 'left'}-4 top-6 w-0.5 h-0.5 rounded-full bg-white animate-pulse delay-700`}></div>
          <div className={`absolute ${isLeft ? 'left' : 'right'}-2 bottom-3 w-0.5 h-0.5 rounded-full bg-white animate-pulse delay-300`}></div>
        </div>
      </div>
      
      {/* SVG curve pattern overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d={svgPath} stroke="white" strokeOpacity="0.3" strokeWidth="0.5" fill="none"/>
          <path d={svgPathLower} stroke="white" strokeOpacity="0.3" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>
    </div>
  );
};

export default ButterflyWings;
