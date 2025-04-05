
import React from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Leaderboard from "@/components/Gamification/Leaderboard";
import AchievementsDisplay from "@/components/Gamification/AchievementsDisplay";
import UserLevel from "@/components/Gamification/UserLevel";
import { User } from "@/types/auth";

// Mock data for demo purposes - in a real app, this would come from API/context
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "student",
    points: 1250,
    level: 5,
    badges: [
      {
        id: "badge1",
        name: "Quiz Master",
        description: "Complete 10 quizzes with a score of 90% or higher",
        image: "",
        criteria: "Complete 10 quizzes with a score of 90% or higher",
        earnedAt: new Date()
      },
      {
        id: "badge2",
        name: "Fast Learner",
        description: "Complete a course in under a week",
        image: "",
        criteria: "Complete a course in under a week",
        earnedAt: new Date()
      }
    ]
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "student",
    avatar: "https://i.pravatar.cc/150?u=jane",
    points: 980,
    level: 4,
    badges: [
      {
        id: "badge1",
        name: "Quiz Master",
        description: "Complete 10 quizzes with a score of 90% or higher",
        image: "",
        criteria: "Complete 10 quizzes with a score of 90% or higher",
        earnedAt: new Date()
      }
    ]
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "student",
    points: 1450,
    level: 6,
    badges: [
      {
        id: "badge3",
        name: "Streak Champion",
        description: "Maintain a 30-day login streak",
        image: "",
        criteria: "Maintain a 30-day login streak",
        earnedAt: new Date()
      }
    ]
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "student",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    points: 760,
    level: 3
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    role: "student",
    points: 2100,
    level: 8,
    badges: [
      {
        id: "badge1",
        name: "Quiz Master",
        description: "Complete 10 quizzes with a score of 90% or higher",
        image: "",
        criteria: "Complete 10 quizzes with a score of 90% or higher",
        earnedAt: new Date()
      },
      {
        id: "badge3",
        name: "Streak Champion",
        description: "Maintain a 30-day login streak",
        image: "",
        criteria: "Maintain a 30-day login streak",
        earnedAt: new Date()
      },
      {
        id: "badge4",
        name: "Gold Scholar",
        description: "Achieve top marks in 5 courses",
        image: "",
        criteria: "Achieve top marks in 5 courses",
        earnedAt: new Date()
      }
    ]
  }
];

const calculateNextLevelPoints = (level: number): number => {
  // Simple formula to calculate next level - can be adjusted
  return level * 300;
};

const calculateCurrentLevelPoints = (level: number): number => {
  return (level - 1) * 300;
};

const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Find the user's rank in the leaderboard
  const userRank = mockUsers.findIndex(u => u.id === user?.id) + 1;

  // Available badges in the system
  const availableBadges = [
    {
      id: "badge1",
      name: "Quiz Master",
      description: "Complete 10 quizzes with a score of 90% or higher",
      image: "",
      criteria: "Complete 10 quizzes with a score of 90% or higher"
    },
    {
      id: "badge2",
      name: "Fast Learner",
      description: "Complete a course in under a week",
      image: "",
      criteria: "Complete a course in under a week"
    },
    {
      id: "badge3",
      name: "Streak Champion",
      description: "Maintain a 30-day login streak",
      image: "",
      criteria: "Maintain a 30-day login streak"
    },
    {
      id: "badge4",
      name: "Gold Scholar",
      description: "Achieve top marks in 5 courses",
      image: "",
      criteria: "Achieve top marks in 5 courses"
    },
    {
      id: "badge5",
      name: "Helpful Peer",
      description: "Answer 50 questions in the discussion forums",
      image: "",
      criteria: "Answer 50 questions in the discussion forums"
    }
  ];

  // Add "earnedAt" property to badges that the user has earned
  const userBadges = availableBadges.map(badge => {
    const earnedBadge = user?.badges?.find(b => b.id === badge.id);
    return earnedBadge ? { ...badge, earnedAt: earnedBadge.earnedAt } : badge;
  });

  // Mock achievements
  const achievements = [
    {
      id: "achievement1",
      name: "First Login",
      description: "Log in to the platform for the first time",
      icon: "🎉",
      earnedAt: new Date()
    },
    {
      id: "achievement2",
      name: "Complete Profile",
      description: "Fill out all profile information",
      icon: "👤",
      earnedAt: new Date()
    },
    {
      id: "achievement3",
      name: "Quiz Ace",
      description: "Score 100% on a quiz",
      icon: "🧠"
    },
    {
      id: "achievement4",
      name: "Course Champion",
      description: "Complete a course with distinction",
      icon: "🏆"
    }
  ];

  return (
    <PageLayout title="Leaderboard & Achievements">
      <div className="space-y-6">
        {user && (
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your achievements and ranking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserLevel 
                level={user.level || 1} 
                points={user.points || 0} 
                nextLevelPoints={calculateNextLevelPoints(user.level || 1)}
                currentLevelPoints={calculateCurrentLevelPoints(user.level || 1)} 
              />
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Your Rank</p>
                  <p className="text-2xl font-bold">
                    #{userRank > 0 ? userRank : '—'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Badges Earned</p>
                  <p className="text-2xl font-bold">
                    {user.badges?.length || 0}/{availableBadges.length}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-2xl font-bold">
                    {user.streak || 0} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="leaderboard">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leaderboard" className="mt-4">
            <Leaderboard 
              users={mockUsers} 
              title="Student Rankings" 
              showBadges={true} 
            />
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <AchievementsDisplay 
              achievements={achievements} 
              badges={userBadges}
              earnedOnly={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default LeaderboardPage;
