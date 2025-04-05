
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
  answeredQuestions?: number[];
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  className,
  answeredQuestions = []
}) => {
  // Calculate the progress percentage
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-violet-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      {/* Question dots for navigation */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <div 
            key={idx} 
            className={cn(
              "transition-all",
              idx + 1 === currentQuestion ? "scale-125" : ""
            )}
          >
            {answeredQuestions?.includes(idx + 1) ? (
              <CheckCircle 
                className={cn(
                  "w-4 h-4", 
                  idx + 1 === currentQuestion 
                    ? "text-green-500 dark:text-green-400" 
                    : "text-green-400 dark:text-green-600"
                )}
              />
            ) : (
              <Circle 
                className={cn(
                  "w-4 h-4", 
                  idx + 1 === currentQuestion 
                    ? "text-blue-500 dark:text-blue-400 fill-blue-100 dark:fill-blue-900/30" 
                    : "text-gray-400 dark:text-gray-600"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizProgressBar;
