
import React from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/types/auth";
import UserLevel from "@/components/Gamification/UserLevel";

interface UserProfileProps {
  user: UserType;
  logout: () => void;
}

const calculateNextLevelPoints = (level: number): number => {
  return level * 300;
};

const calculateCurrentLevelPoints = (level: number): number => {
  return (level - 1) * 300;
};

const UserProfile: React.FC<UserProfileProps> = ({ user, logout }) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <User size={20} className="text-white" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
        </div>
      </div>
      
      {(user.points !== undefined || user.level !== undefined) && (
        <div className="mt-2">
          <UserLevel 
            level={user.level || 1} 
            points={user.points || 0} 
            nextLevelPoints={calculateNextLevelPoints(user.level || 1)}
            currentLevelPoints={calculateCurrentLevelPoints(user.level || 1)} 
          />
        </div>
      )}
      
      {user.badges && user.badges.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-500 mb-2">Recent Badges</p>
          <div className="flex gap-2">
            {user.badges.slice(0, 3).map(badge => (
              <div key={badge.id} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <span className="text-xs">🏆</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="mt-4 w-full justify-start text-left"
        onClick={() => logout()}
      >
        <LogOut size={16} className="mr-2" />
        Sign out
      </Button>
    </div>
  );
};

export default UserProfile;
