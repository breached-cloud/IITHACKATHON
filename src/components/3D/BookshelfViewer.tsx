
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ExternalLink } from 'lucide-react';

interface BookshelfViewerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
  height?: string;
  className?: string;
}

const BookshelfViewer: React.FC<BookshelfViewerProps> = ({
  title = "Interactive Digital Bookshelf",
  description = "Explore our collection of educational resources in this interactive 3D bookshelf.",
  ctaText,
  ctaAction,
  height = "320px",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Card 
      className={`overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-0 ${className} ${isActive ? 'ring-2 ring-offset-2 ring-offset-background ring-blue-500' : ''}`}
      style={{
        boxShadow: isHovered ? '0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 8px 10px -6px rgba(59, 130, 246, 0.2)' : ''
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{ height }} 
        className="relative border-b cursor-pointer bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-900/20 dark:to-blue-800/30"
        onClick={handleClick}
      >
        <div className="w-full h-full flex items-center justify-center">
          {/* Stylized bookshelf visualization */}
          <div className="relative w-4/5 h-4/5">
            {/* Bookshelf structure */}
            <div className="absolute inset-0 bg-amber-800/80 dark:bg-amber-900/80 rounded-md"></div>
            
            {/* Shelves */}
            <div className="absolute left-0 right-0 top-1/4 h-2 bg-amber-700/90 dark:bg-amber-800/90"></div>
            <div className="absolute left-0 right-0 top-2/4 h-2 bg-amber-700/90 dark:bg-amber-800/90"></div>
            <div className="absolute left-0 right-0 top-3/4 h-2 bg-amber-700/90 dark:bg-amber-800/90"></div>
            
            {/* Books on shelves */}
            {/* Top shelf */}
            <div className="absolute left-[5%] right-[60%] top-[5%] bottom-[26%] bg-red-500 rounded-sm"></div>
            <div className="absolute left-[42%] right-[38%] top-[8%] bottom-[26%] bg-blue-500 rounded-sm"></div>
            <div className="absolute left-[65%] right-[20%] top-[7%] bottom-[26%] bg-green-600 rounded-sm"></div>
            <div className="absolute left-[82%] right-[5%] top-[10%] bottom-[26%] bg-purple-600 rounded-sm"></div>
            
            {/* Middle shelf */}
            <div className="absolute left-[10%] right-[70%] top-[26%] bottom-[51%] bg-yellow-500 rounded-sm"></div>
            <div className="absolute left-[32%] right-[55%] top-[28%] bottom-[51%] bg-pink-500 rounded-sm"></div>
            <div className="absolute left-[48%] right-[35%] top-[26%] bottom-[51%] bg-cyan-600 rounded-sm"></div>
            <div className="absolute left-[70%] right-[10%] top-[27%] bottom-[51%] bg-emerald-600 rounded-sm"></div>
            
            {/* Bottom shelf */}
            <div className="absolute left-[5%] right-[75%] top-[51%] bottom-[5%] bg-indigo-600 rounded-sm"></div>
            <div className="absolute left-[30%] right-[50%] top-[52%] bottom-[5%] bg-amber-500 rounded-sm"></div>
            <div className="absolute left-[55%] right-[25%] top-[54%] bottom-[5%] bg-lime-600 rounded-sm"></div>
            <div className="absolute left-[80%] right-[8%] top-[51%] bottom-[5%] bg-rose-600 rounded-sm"></div>
            
            {/* Animation for active state */}
            {isActive && (
              <div className="absolute inset-0 bg-white/10 dark:bg-blue-500/10 animate-pulse rounded-md"></div>
            )}
          </div>
        </div>
        
        {/* Decorative book corner */}
        {isHovered && (
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-80 transition-opacity duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="25" y="25" width="50" height="60" rx="5" fill="rgba(59, 130, 246, 0.2)" />
              <rect x="30" y="35" width="40" height="5" rx="2" fill="#3b82f6" />
              <rect x="30" y="45" width="40" height="3" rx="1.5" fill="#3b82f6" />
              <rect x="30" y="52" width="30" height="3" rx="1.5" fill="#3b82f6" />
              <rect x="30" y="59" width="35" height="3" rx="1.5" fill="#3b82f6" />
            </svg>
          </div>
        )}
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Book className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        
        {ctaText && ctaAction && (
          <Button 
            onClick={ctaAction} 
            className="w-full mt-auto bg-blue-600 hover:bg-blue-700 group"
          >
            {ctaText}
            <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookshelfViewer;
