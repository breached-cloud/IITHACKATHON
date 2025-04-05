
import React from "react";
import ButterflyWings from "./ButterflyWings";
import ButterflyBody from "./ButterflyBody";
import SparklingTrail from "./SparklingTrail";

interface ButterflyAnimationProps {
  isFluttering: boolean;
}

const ButterflyAnimation: React.FC<ButterflyAnimationProps> = ({ isFluttering }) => {
  return (
    <div className="butterfly-animation scale-50">
      {/* Beautiful Butterfly Design */}
      <div className="relative w-28 h-24">
        {/* Left Wings */}
        <ButterflyWings isFluttering={isFluttering} side="left" />
        
        {/* Right Wings */}
        <ButterflyWings isFluttering={isFluttering} side="right" />
        
        {/* Body */}
        <ButterflyBody />
      </div>
      
      {/* Sparkling trail effect */}
      <SparklingTrail />
    </div>
  );
};

export default ButterflyAnimation;
