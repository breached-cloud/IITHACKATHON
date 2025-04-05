
import React, { useState } from 'react';
import ThreeJsViewer from './ThreeJsViewer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink, Dna, Atom, Code, BookOpen } from 'lucide-react';

interface ModelShowcaseProps {
  title: string;
  description: string;
  modelType: 'abstract' | 'biology' | 'physics' | 'programming';
  color?: string;
  height?: string;
  ctaText?: string;
  ctaAction?: () => void;
  className?: string;
  splineScene?: string; // Optional specific Spline scene URL - ignored now
}

const ModelShowcase: React.FC<ModelShowcaseProps> = ({
  title,
  description,
  modelType = 'abstract',
  color = '#3b82f6',
  height = "320px", // Fixed height for all cards
  ctaText,
  ctaAction,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasModelError, setHasModelError] = useState(false);

  const handleModelClick = () => {
    setIsActive(!isActive);
  };

  const handleModelError = () => {
    setHasModelError(true);
  };

  const modelColors = {
    abstract: '#3b82f6',
    biology: '#10b981',
    physics: '#8b5cf6',
    programming: '#f59e0b'
  };

  const modelIcons = {
    abstract: <BookOpen className="h-5 w-5" />,
    biology: <Dna className="h-5 w-5" />,
    physics: <Atom className="h-5 w-5" />,
    programming: <Code className="h-5 w-5" />
  };

  const actualColor = color || modelColors[modelType];

  // Fallback UI for when 3D rendering fails
  const modelFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="text-center p-4">
        <div className="mb-2 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700">
          {modelIcons[modelType]}
        </div>
        <p className="text-sm font-medium">Interactive 3D unavailable</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Static view shown instead</p>
      </div>
    </div>
  );

  return (
    <Card 
      className={`overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-0 ${className} ${isActive ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
      style={{
        boxShadow: isHovered ? `0 10px 25px -5px ${actualColor}30, 0 8px 10px -6px ${actualColor}20` : '',
        ...(isActive ? {borderColor: actualColor, ringColor: actualColor} : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{ height }} 
        className="relative border-b cursor-pointer bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80"
        onClick={handleModelClick}
      >
        <ThreeJsViewer 
          type={modelType}
          color={actualColor}
          height={height}
          className="bg-transparent"
          onModelClick={handleModelClick}
          fallback={modelFallback}
          onError={handleModelError}
        />
        
        {!hasModelError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 dark:hover:bg-white/5 transition-all duration-300">
            <span className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {isActive ? "Click to switch view" : "Click to interact"}
            </span>
          </div>
        )}
        
        {/* Enhanced decorative elements based on model type */}
        {modelType === 'biology' && isHovered && !hasModelError && (
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-80 transition-opacity duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,20 C60,20 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 C30,30 40,20 50,20 Z" fill="rgba(16, 185, 129, 0.2)" />
              <path d="M50,30 L50,70" stroke="#10b981" strokeWidth="2" />
              <path d="M40,35 L60,35" stroke="#10b981" strokeWidth="2" />
              <path d="M40,45 L60,45" stroke="#10b981" strokeWidth="2" />
              <path d="M40,55 L60,55" stroke="#10b981" strokeWidth="2" />
              <path d="M40,65 L60,65" stroke="#10b981" strokeWidth="2" />
              <circle cx="50" cy="25" r="3" fill="#10b981" />
              <circle cx="50" cy="75" r="3" fill="#10b981" />
            </svg>
          </div>
        )}
        
        {modelType === 'physics' && isHovered && !hasModelError && (
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-80 transition-opacity duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="15" fill="rgba(139, 92, 246, 0.3)" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="35" cy="35" r="3" fill="#8b5cf6" />
              <circle cx="65" cy="65" r="3" fill="#8b5cf6" />
              <circle cx="65" cy="35" r="3" fill="#8b5cf6" />
              <circle cx="35" cy="65" r="3" fill="#8b5cf6" />
            </svg>
          </div>
        )}
        
        {modelType === 'programming' && isHovered && !hasModelError && (
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-80 transition-opacity duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="30" y="30" width="40" height="40" rx="5" fill="rgba(245, 158, 11, 0.2)" />
              <path d="M30,50 L45,35 M55,35 L70,50 M70,50 L55,65 M45,65 L30,50" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <rect x="43" y="43" width="14" height="14" rx="2" fill="#f59e0b" />
            </svg>
          </div>
        )}
        
        {/* Model type indicator */}
        <div className="absolute top-3 left-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-md">
          <div style={{color: actualColor}}>
            {modelIcons[modelType]}
          </div>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        
        {ctaText && ctaAction && (
          <Button 
            onClick={ctaAction} 
            className="w-full mt-auto group"
            style={{backgroundColor: actualColor}}
          >
            {ctaText}
            <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelShowcase;
