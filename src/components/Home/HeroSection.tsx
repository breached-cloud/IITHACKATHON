
import React, { useState, useEffect } from "react";
import HeroBackground from "./components/HeroBackground";
import HeroTitle from "./components/HeroTitle";
import HeroButtons from "./components/HeroButtons";
import HeroStats from "./components/HeroStats";
import ScrollIndicator from "./components/ScrollIndicator";
import HeroEducationElements from "./components/HeroEducationElements";
import ThreeJsViewer from "@/components/3D/ThreeJsViewer";
import FlyingButterfly from "./components/FlyingButterfly";
import { toast } from "sonner";

const HeroSection: React.FC = () => {
  // Interactive feature - Scroll indicator
  const [scrolled, setScrolled] = useState(false);

  // Interactive feature - Parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Interactive feature - Text highlight
  const [isTextHighlighted, setIsTextHighlighted] = useState(false);
  
  // Handle mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    setMousePosition({ x: moveX, y: moveY });
  };

  // Handle butterfly hover on text
  const handleButterflyHover = (isHovering: boolean) => {
    setIsTextHighlighted(isHovering);
  };

  // Scroll indicator effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      className="relative pt-20 overflow-hidden min-h-[90vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Traditional background - reliable and performant */}
      <HeroBackground mousePosition={mousePosition} />
      
      {/* Use ThreeJS which is much more reliable */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ThreeJsViewer 
          type="abstract"
          color="#3b82f6"
          height="100%" 
          fallback={<div className="w-full h-full"></div>}
        />
      </div>
      
      {/* Flying butterfly */}
      <FlyingButterfly onHover={handleButterflyHover} />
      
      {/* Enhanced floating elements for visual interest - pure CSS, very reliable */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating animated gradients as visual elements */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-green-400/20 to-blue-500/20 blur-xl animate-float" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-500/20 blur-lg animate-float" style={{animationDelay: "2s"}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl animate-float" style={{animationDelay: "1.5s"}}></div>
      </div>
      
      {/* Add more reliable education elements */}
      <HeroEducationElements />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="text-center">
            <HeroTitle textHighlighted={isTextHighlighted} />
            <HeroButtons />
            <HeroStats />
          </div>
        </div>
      </div>
      
      <ScrollIndicator scrolled={scrolled} />
    </div>
  );
};

export default HeroSection;
