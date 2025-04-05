
import React from "react";

const ButterflyBody: React.FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2 w-2 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-violet-900 via-purple-800 to-purple-900 rounded-full">
      {/* Body segments */}
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="w-full h-[3px] bg-black/30 rounded-full"></div>
        <div className="w-full h-[3px] bg-black/30 rounded-full"></div>
        <div className="w-full h-[3px] bg-black/30 rounded-full"></div>
        <div className="w-full h-[3px] bg-black/30 rounded-full"></div>
      </div>
      
      {/* Head */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-900 rounded-full">
        {/* Eyes */}
        <div className="absolute -left-1 top-0 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute -right-1 top-0 w-1 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* Antennas */}
      <div className="absolute -top-4 -left-1 w-0.5 h-5 bg-purple-800 rounded-full rotate-[-30deg]"></div>
      <div className="absolute -top-4 -right-1 w-0.5 h-5 bg-purple-800 rounded-full rotate-[30deg]"></div>
      
      {/* Antenna tips */}
      <div className="absolute -top-5 -left-2 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
      <div className="absolute -top-5 -right-2 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>

      {/* Legs */}
      <div className="absolute top-1/4 -left-2 w-2 h-[1px] bg-purple-800"></div>
      <div className="absolute top-1/4 -right-2 w-2 h-[1px] bg-purple-800"></div>
      <div className="absolute top-2/4 -left-2 w-2 h-[1px] bg-purple-800"></div>
      <div className="absolute top-2/4 -right-2 w-2 h-[1px] bg-purple-800"></div>
      <div className="absolute top-3/4 -left-2 w-2 h-[1px] bg-purple-800"></div>
      <div className="absolute top-3/4 -right-2 w-2 h-[1px] bg-purple-800"></div>
    </div>
  );
};

export default ButterflyBody;
