
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UserLevelProps {
  level: number;
  points: number;
  nextLevelPoints: number;
  currentLevelPoints: number;
}

const UserLevel: React.FC<UserLevelProps> = ({ level, points, nextLevelPoints, currentLevelPoints }) => {
  const progressPercentage = 
    ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
            Level {level}
          </Badge>
          <span className="text-sm font-medium">{points} XP</span>
        </div>
        <span className="text-xs text-gray-500">
          {nextLevelPoints - points} XP to Level {level + 1}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default UserLevel;
