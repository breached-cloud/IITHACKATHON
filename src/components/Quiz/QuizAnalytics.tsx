
import React from "react";
import { QuizAnalytics as QuizAnalyticsType } from "@/types/quiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Clock, Users, BarChart as BarChartIcon } from "lucide-react";

interface QuizAnalyticsProps {
  analytics: QuizAnalyticsType;
}

const QuizAnalytics: React.FC<QuizAnalyticsProps> = ({ analytics }) => {
  // Format time in minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Calculate grade distribution
  const gradeDistribution = [
    { name: "A (90-100%)", value: 0 },
    { name: "B (80-89%)", value: 0 },
    { name: "C (70-79%)", value: 0 },
    { name: "D (60-69%)", value: 0 },
    { name: "F (0-59%)", value: 0 },
  ];

  // Populate with mock data for demonstration
  gradeDistribution[0].value = Math.round(analytics.totalAttempts * 0.3); // 30% A
  gradeDistribution[1].value = Math.round(analytics.totalAttempts * 0.25); // 25% B
  gradeDistribution[2].value = Math.round(analytics.totalAttempts * 0.2); // 20% C
  gradeDistribution[3].value = Math.round(analytics.totalAttempts * 0.15); // 15% D
  gradeDistribution[4].value = Math.round(analytics.totalAttempts * 0.1); // 10% F

  // Colors for pie chart
  const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];

  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                <Users className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Total Attempts</div>
                <div className="text-2xl font-bold">{analytics.totalAttempts}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                <Award className="text-green-600 dark:text-green-400 h-6 w-6" />
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Average Score</div>
                <div className="text-2xl font-bold">{Math.round(analytics.averageScore)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                <BarChartIcon className="text-purple-600 dark:text-purple-400 h-6 w-6" />
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Score Range</div>
                <div className="text-2xl font-bold">{analytics.lowestScore}-{analytics.highestScore}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                <Clock className="text-orange-600 dark:text-orange-400 h-6 w-6" />
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Avg Time</div>
                <div className="text-2xl font-bold">{formatTime(analytics.averageTimeSpent)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="distribution">Score Distribution</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>
                Breakdown of student grades on this quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} students`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Question Performance</CardTitle>
              <CardDescription>
                Number of correct vs. incorrect responses per question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.questionPerformance.map((q, i) => ({
                      name: `Q${i+1}`,
                      fullQuestion: q.question,
                      correct: q.correctResponses,
                      incorrect: q.incorrectResponses,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [value, name === 'correct' ? 'Correct Answers' : 'Incorrect Answers']}
                      labelFormatter={(label, data) => data[0]?.payload.fullQuestion || label}
                    />
                    <Legend />
                    <Bar dataKey="correct" fill="#4CAF50" name="Correct" />
                    <Bar dataKey="incorrect" fill="#F44336" name="Incorrect" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizAnalytics;
