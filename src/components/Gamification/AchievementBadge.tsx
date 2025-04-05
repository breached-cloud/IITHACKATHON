
import React from "react";
import { Badge as AchievementType } from "@/types/auth";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Medal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AchievementBadgeProps {
  badge: AchievementType;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  badge,
  size = "md",
  showTooltip = true,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const getIcon = () => {
    // Here we would ideally have unique icons for each badge
    // For now, we'll use a simple mapping based on the badge name
    if (badge.name.toLowerCase().includes("gold")) return <Trophy className="text-yellow-500" />;
    if (badge.name.toLowerCase().includes("silver")) return <Award className="text-gray-400" />;
    if (badge.name.toLowerCase().includes("bronze")) return <Medal className="text-amber-700" />;
    return <Star className="text-blue-500" />;
  };

  const badgeDisplay = (
    <div className={`relative ${badge.earnedAt ? "" : "opacity-50 grayscale"}`}>
      <div
        className={`${
          sizeClasses[size]
        } rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-0.5`}
      >
        <div className="bg-white dark:bg-gray-900 rounded-full w-full h-full flex items-center justify-center">
          {badge.image ? (
            <img src={badge.image} alt={badge.name} className="w-3/4 h-3/4 object-contain" />
          ) : (
            <div className="w-3/4 h-3/4 flex items-center justify-center">{getIcon()}</div>
          )}
        </div>
      </div>
      {badge.earnedAt && (
        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white dark:border-gray-900"></div>
      )}
    </div>
  );

  if (!showTooltip) return badgeDisplay;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badgeDisplay}</TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="text-center">
            <p className="font-bold">{badge.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
            {badge.earnedAt && (
              <p className="text-xs text-green-600 mt-1">
                Earned on {badge.earnedAt.toLocaleDateString()}
              </p>
            )}
            {!badge.earnedAt && (
              <p className="text-xs text-gray-500 mt-1">Criteria: {badge.criteria}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
