
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';

interface BookViewerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
  height?: string;
  className?: string;
}

const BookViewer: React.FC<BookViewerProps> = ({
  title = "Interactive 3D Book",
  description = "Explore educational content in this interactive 3D book format.",
  ctaText,
  ctaAction,
  height = "400px",
  className = ""
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div style={{ height }} className="relative border-b bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/30 flex items-center justify-center">
        {/* Enhanced static book visualization with animation */}
        <div className="relative w-3/5 h-4/5 perspective-1000">
          <div className="absolute inset-0 transform hover:rotate-y-15 transition-transform duration-500 animate-float">
            <div className="absolute inset-0 bg-blue-600 rounded-md shadow-xl"></div>
            <div className="absolute inset-x-0 top-[10%] bottom-[90%] bg-white/80 dark:bg-gray-200/80 mx-4"></div>
            <div className="absolute inset-x-0 top-[15%] bottom-[80%] bg-white/80 dark:bg-gray-200/80 mx-4"></div>
            <div className="absolute inset-x-0 top-[20%] bottom-[75%] bg-white/80 dark:bg-gray-200/80 mx-6"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white dark:text-gray-100 font-bold text-lg text-center px-4">
                Educational<br/>Learning<br/>Material
              </div>
            </div>
            
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-blue-800 rounded-l-md"></div>
            
            {/* Add decorative elements */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <Book className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Book className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        {ctaText && ctaAction && (
          <Button onClick={ctaAction} className="w-full">
            {ctaText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookViewer;
