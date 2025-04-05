
import React from "react";
import { Achievement, Badge as BadgeType } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementBadge from "./AchievementBadge";

interface AchievementsDisplayProps {
  achievements?: Achievement[];
  badges?: BadgeType[];
  earnedOnly?: boolean;
}

const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({
  achievements = [],
  badges = [],
  earnedOnly = false,
}) => {
  const earnedAchievements = achievements.filter(a => a.earnedAt);
  const lockedAchievements = achievements.filter(a => !a.earnedAt);
  
  const earnedBadges = badges.filter(b => b.earnedAt);
  const lockedBadges = badges.filter(b => !b.earnedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="achievements">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements">
            <div className="space-y-4">
              {earnedAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Earned Achievements</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {earnedAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex flex-col items-center text-center">
                        <div className="mb-1">
                          {achievement.icon ? (
                            <div 
                              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: achievement.icon }} 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xl">🏆</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium">{achievement.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!earnedOnly && lockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-500">Locked Achievements</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {lockedAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex flex-col items-center text-center opacity-50">
                        <div className="mb-1">
                          {achievement.icon ? (
                            <div 
                              className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: achievement.icon }} 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-xl">🔒</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium">{achievement.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {achievements.length === 0 && (
                <div className="text-center py-6 text-gray-500">No achievements yet</div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="badges">
            <div className="space-y-4">
              {earnedBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Earned Badges</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {earnedBadges.map((badge) => (
                      <div key={badge.id} className="flex flex-col items-center text-center">
                        <AchievementBadge badge={badge} size="md" />
                        <span className="text-xs font-medium mt-1">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!earnedOnly && lockedBadges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-500">Locked Badges</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {lockedBadges.map((badge) => (
                      <div key={badge.id} className="flex flex-col items-center text-center">
                        <AchievementBadge badge={badge} size="md" />
                        <span className="text-xs font-medium mt-1">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {badges.length === 0 && (
                <div className="text-center py-6 text-gray-500">No badges yet</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AchievementsDisplay;
