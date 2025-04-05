
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuizTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
  className?: string;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ 
  timeLimit, 
  onTimeUp,
  className 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert to seconds
  const { toast } = useToast();

  // Format time as mm:ss
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Warning thresholds
  const warningThreshold = timeLimit * 60 * 0.25; // 25% of total time
  const dangerThreshold = timeLimit * 60 * 0.1; // 10% of total time

  // Send notifications at specific points
  useEffect(() => {
    const halfwayPoint = timeLimit * 60 * 0.5;
    const fiveMinutesLeft = 5 * 60;
    const oneMinuteLeft = 60;

    if (timeRemaining === Math.floor(halfwayPoint)) {
      toast({ 
        title: "Half Time",
        description: `You have ${Math.floor(timeRemaining / 60)} minutes remaining.`,
        variant: "default"
      });
    } else if (timeRemaining === fiveMinutesLeft) {
      toast({ 
        title: "Five Minutes Left",
        description: "You have 5 minutes remaining to complete the quiz.",
        variant: "default"
      });
    } else if (timeRemaining === oneMinuteLeft) {
      toast({ 
        title: "One Minute Left",
        description: "You have 1 minute remaining to complete the quiz.",
        variant: "destructive"
      });
    }
  }, [timeRemaining, timeLimit, toast]);

  // Timer logic
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  // Return percentage of time remaining for visual feedback
  const getTimePercentage = () => {
    return (timeRemaining / (timeLimit * 60)) * 100;
  };

  return (
    <div className={cn(
      "flex flex-col gap-1",
      className
    )}>
      <div className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
        timeRemaining <= dangerThreshold 
          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
          : timeRemaining <= warningThreshold 
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      )}>
        {timeRemaining <= warningThreshold ? (
          <AlertCircle className="h-5 w-5" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
        <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
      </div>
      
      {/* Timer progress bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-1000",
            timeRemaining <= dangerThreshold 
              ? "bg-red-500" 
              : timeRemaining <= warningThreshold 
                ? "bg-yellow-500" 
                : "bg-blue-500"
          )}
          style={{ width: `${getTimePercentage()}%` }}
        />
      </div>
    </div>
  );
};

export default QuizTimer;
