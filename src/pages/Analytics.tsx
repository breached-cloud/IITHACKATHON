
import React, { useMemo } from "react";
import { useData } from "@/hooks/useDataContext";
import { useAuth } from "@/hooks/useAuth";
import PageLayout from "@/components/Layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Users,
  BookOpen,
  Award,
  Calculator,
} from "lucide-react";
import { BarChart, LineChart, PieChart } from "recharts";

const Analytics: React.FC = () => {
  const { courses } = useData();
  const { user } = useAuth();
  
  // Only show courses for the current faculty if the user is a faculty member
  const filteredCourses = useMemo(() => {
    if (user?.role === "faculty" && user?.id) {
      return courses?.filter(course => course.facultyId === user.id) || [];
    }
    return courses || [];
  }, [courses, user]);
  
  // Calculate enrollment data
  const enrollmentData = useMemo(() => {
    if (!filteredCourses?.length) return [];
    
    return filteredCourses
      .slice(0, 10) // Take only the top 10 courses
      .map(course => ({
        name: course.title,
        value: course.enrolledStudents
      }))
      .sort((a, b) => b.value - a.value); // Sort by enrollment count descending
  }, [filteredCourses]);
  
  // Generate category distribution data
  const categoryData = useMemo(() => {
    if (!filteredCourses?.length) return [];
    
    const categories: Record<string, number> = {};
    
    filteredCourses.forEach(course => {
      if (!course.category) return;
      
      if (categories[course.category]) {
        categories[course.category]++;
      } else {
        categories[course.category] = 1;
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
  }, [filteredCourses]);
  
  // Mock activity data over time
  const activityData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map((month, index) => ({
      name: month,
      "Course Views": Math.floor(Math.random() * 500) + 100,
      "Assignments Submitted": Math.floor(Math.random() * 300) + 50
    }));
  }, []);
  
  const stats = useMemo(() => [
    {
      title: "Total Students",
      value: filteredCourses.reduce((acc, course) => acc + course.enrolledStudents, 0),
      icon: <Users className="h-5 w-5" />,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Courses",
      value: filteredCourses.length,
      icon: <BookOpen className="h-5 w-5" />,
      change: "+3",
      changeType: "positive" 
    },
    {
      title: "Assignments",
      value: 0, // Fixed: removed reference to nonexistent assignments property
      icon: <Calculator className="h-5 w-5" />,
      change: "-2",
      changeType: "negative"
    },
    {
      title: "Completion Rate",
      value: "78%",
      icon: <Award className="h-5 w-5" />,
      change: "+5%",
      changeType: "positive"
    }
  ], [filteredCourses]);

  return (
    <PageLayout
      title="Analytics Dashboard"
      // Fixed: removed description prop as it doesn't exist in PageLayoutProps
      requiredRoles={["faculty", "admin"]}
    >
      <div className="space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-muted p-2 text-primary">
                    {stat.icon}
                  </div>
                </div>
                
                <div className={`mt-4 flex items-center text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="enrollment">
          <TabsList className="mb-4">
            <TabsTrigger value="enrollment">
              <BarChartIcon className="h-4 w-4 mr-2" />
              Course Enrollment
            </TabsTrigger>
            <TabsTrigger value="activity">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Activity Trends
            </TabsTrigger>
            <TabsTrigger value="categories">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrollment">
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollment</CardTitle>
                <CardDescription>
                  Number of students enrolled in each course
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {enrollmentData.length > 0 ? (
                  <ChartContainer 
                    config={{}} 
                    className="w-full h-full"
                  >
                    <BarChart
                      width={500}
                      height={300}
                      data={enrollmentData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <text
                        x={500 / 2}
                        y={20}
                        fill="gray"
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        Course Enrollment Data
                      </text>
                      <defs>
                        <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No enrollment data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Trends</CardTitle>
                <CardDescription>
                  Course views and assignment submissions over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{}} 
                  className="w-full h-full"
                >
                  <LineChart
                    width={500}
                    height={300}
                    data={activityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {/* Line chart configuration */}
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Course Categories</CardTitle>
                <CardDescription>
                  Distribution of courses by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {categoryData.length > 0 ? (
                  <ChartContainer 
                    config={{}} 
                    className="w-full h-full"
                  >
                    <PieChart
                      width={500}
                      height={300}
                    >
                      {/* Pie chart configuration */}
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No category data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Analytics;
