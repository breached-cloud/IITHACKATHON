
import React from "react";
import SidebarLayout from "@/components/Layout/SidebarLayout";
import { useData } from "@/hooks/useDataContext";
import { useAuth } from "@/hooks/useAuth";
import StatCard from "@/components/UI/StatCard";
import CourseCard from "@/components/UI/CourseCard";
import QuickActionCard from "@/components/Dashboard/QuickActionCard";
import { ArrowRight, BookOpen, CheckCircle, Clock, Users, Trophy, Award, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserLevel from "@/components/Gamification/UserLevel";

const Dashboard: React.FC = () => {
  const { courses } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get recent courses (latest 3)
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
    
  // Stats data based on user role
  const getStats = () => {
    if (user?.role === "admin") {
      return [
        { 
          title: "Total Courses", 
          value: courses.length, 
          icon: <BookOpen className="h-6 w-6" />,
          change: { value: "+5%", isPositive: true } 
        },
        { 
          title: "Active Students", 
          value: courses.reduce((sum, course) => sum + course.enrolledStudents, 0), 
          icon: <Users className="h-6 w-6" />,
          change: { value: "+12%", isPositive: true } 
        },
        { 
          title: "Completion Rate", 
          value: "78%", 
          icon: <CheckCircle className="h-6 w-6" />,
          change: { value: "+3%", isPositive: true } 
        },
        { 
          title: "Avg. Engagement", 
          value: "4.2h", 
          icon: <Clock className="h-6 w-6" />,
          change: { value: "-1%", isPositive: false } 
        }
      ];
    } else if (user?.role === "faculty") {
      return [
        { 
          title: "Your Courses", 
          value: courses.filter(course => course.facultyId === user.id).length, 
          icon: <BookOpen className="h-6 w-6" /> 
        },
        { 
          title: "Total Students", 
          value: courses
            .filter(course => course.facultyId === user.id)
            .reduce((sum, course) => sum + course.enrolledStudents, 0), 
          icon: <Users className="h-6 w-6" />,
          change: { value: "+8%", isPositive: true } 
        },
        { 
          title: "Completion Rate", 
          value: "82%", 
          icon: <CheckCircle className="h-6 w-6" />,
          change: { value: "+5%", isPositive: true } 
        },
        { 
          title: "Avg. Session", 
          value: "3.8h", 
          icon: <Clock className="h-6 w-6" /> 
        }
      ];
    } else { // student
      return [
        { 
          title: "Enrolled Courses", 
          value: 3, 
          icon: <BookOpen className="h-6 w-6" /> 
        },
        { 
          title: "Completed", 
          value: 1, 
          icon: <CheckCircle className="h-6 w-6" /> 
        },
        { 
          title: "In Progress", 
          value: 2, 
          icon: <Clock className="h-6 w-6" />,
          change: { value: "70%", isPositive: true } 
        },
        { 
          title: "Learning Time", 
          value: "28h", 
          icon: <Clock className="h-6 w-6" />,
          change: { value: "+2h", isPositive: true } 
        }
      ];
    }
  };

  // Mock user badges for demonstration
  const userBadges = [
    {
      id: "badge1",
      name: "Quiz Master",
      description: "Complete 10 quizzes with a score of 90% or higher",
      image: "",
      earnedAt: new Date()
    },
    {
      id: "badge2",
      name: "Fast Learner",
      description: "Complete a course in under a week",
      image: "",
      earnedAt: new Date()
    }
  ];

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Pick up where you left off in your most recent course.",
      buttonText: "Resume Course",
      onClick: () => navigate(`/courses/${recentCourses[0]?.id || ""}`),
      splineScene: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    },
    {
      title: "Upcoming Deadlines",
      description: "Check assignments and quizzes due this week.",
      buttonText: "View Deadlines",
      onClick: () => navigate("/assignments"),
      splineScene: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    },
    {
      title: "Messages",
      description: "You have 3 unread messages from instructors.",
      buttonText: "Check Messages",
      onClick: () => navigate("/messages"),
      splineScene: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    }
  ];

  const calculateNextLevelPoints = (level: number): number => {
    return level * 300;
  };

  const calculateCurrentLevelPoints = (level: number): number => {
    return (level - 1) * 300;
  };

  return (
    <SidebarLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}!
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {getStats().map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      {/* Gamification Section */}
      {user?.role === "student" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
              Your Progress
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/leaderboard")}
            >
              View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <UserLevel 
                  level={user.level || 1} 
                  points={user.points || 0} 
                  nextLevelPoints={calculateNextLevelPoints(user.level || 1)}
                  currentLevelPoints={calculateCurrentLevelPoints(user.level || 1)} 
                />
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Current Streak</p>
                    <p className="text-xl font-bold flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-1 text-orange-500" />
                      {user.streak || 0} days
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Points Earned</p>
                    <p className="text-xl font-bold flex items-center justify-center">
                      <Star className="h-4 w-4 mr-1 text-blue-500" />
                      {user.points || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Rank</p>
                    <p className="text-xl font-bold flex items-center justify-center">
                      <Award className="h-4 w-4 mr-1 text-purple-500" />
                      #{user.rank || "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Badges Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                {userBadges.length > 0 ? (
                  <div className="space-y-4">
                    {userBadges.map(badge => (
                      <div key={badge.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-0.5">
                          <div className="bg-white dark:bg-gray-900 rounded-full w-full h-full flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{badge.name}</p>
                          <p className="text-xs text-gray-500">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full text-sm"
                      onClick={() => navigate("/leaderboard")}
                    >
                      View All Badges
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Trophy className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No badges earned yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/leaderboard")}
                    >
                      View Available Badges
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {/* Recent Activity Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/courses")}
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              buttonText={action.buttonText}
              onButtonClick={action.onClick}
              splineScene={action.splineScene}
            />
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
