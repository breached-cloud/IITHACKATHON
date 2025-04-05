
import React from "react";
import { User } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal } from "lucide-react";
import AchievementBadge from "./AchievementBadge";

interface LeaderboardProps {
  users: User[];
  limit?: number;
  title?: string;
  showBadges?: boolean;
}

const LeaderboardRow: React.FC<{ user: User; position: number; showBadges?: boolean }> = ({
  user,
  position,
  showBadges = true,
}) => {
  const getPositionIcon = () => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-gray-500 font-medium w-5 text-center">{position}</span>;
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case 1:
        return "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500";
      case 2:
        return "bg-gray-50 dark:bg-gray-800/50 border-l-4 border-gray-400";
      case 3:
        return "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-700";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg ${getPositionStyle()} ${
        position <= 3 ? "mb-2" : ""
      }`}
    >
      <div className="flex items-center justify-center w-8 h-8">{getPositionIcon()}</div>
      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <Badge variant="secondary" className="ml-2">
            {user.points || 0} XP
          </Badge>
        </div>
        <p className="text-xs text-gray-500 truncate">
          Level {user.level || 1} · {user.role}
        </p>
      </div>
      {showBadges && user.badges && user.badges.length > 0 && (
        <div className="flex -space-x-2">
          {user.badges.slice(0, 3).map((badge) => (
            <AchievementBadge key={badge.id} badge={badge} size="sm" />
          ))}
          {user.badges.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
              +{user.badges.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Leaderboard: React.FC<LeaderboardProps> = ({
  users,
  limit = 10,
  title = "Leaderboard",
  showBadges = true,
}) => {
  // Sort users by points in descending order
  const sortedUsers = [...users]
    .filter(user => user.points !== undefined)
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, limit);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sortedUsers.map((user, index) => (
          <LeaderboardRow
            key={user.id}
            user={user}
            position={index + 1}
            showBadges={showBadges}
          />
        ))}
        {sortedUsers.length === 0 && (
          <div className="text-center py-6 text-gray-500">No users found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
