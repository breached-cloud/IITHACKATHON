
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Award, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface QuizListProps {
  courseId?: string;
}

const QuizList: React.FC<QuizListProps> = ({ courseId }) => {
  const { availableQuizzes, studentPerformance } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter quizzes by course if courseId is provided
  const quizzes = courseId
    ? availableQuizzes.filter(quiz => quiz.courseId === courseId)
    : availableQuizzes;

  // Sort quizzes: published first, then by availability date
  const sortedQuizzes = [...quizzes].sort((a, b) => {
    if (a.status === "published" && b.status !== "published") return -1;
    if (a.status !== "published" && b.status === "published") return 1;
    
    if (a.availableFrom && b.availableFrom) {
      return a.availableFrom.getTime() - b.availableFrom.getTime();
    }
    
    return 0;
  });

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No quizzes available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {courseId
            ? "There are no quizzes available for this course yet."
            : "There are no quizzes available at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedQuizzes.map(quiz => {
        // Find student's performance for this quiz
        const performance = studentPerformance?.find(p => p.quizId === quiz.id);
        const hasAttempted = !!performance;
        
        // Calculate if it's available now
        const now = new Date();
        const isAvailable = 
          quiz.status === "published" && 
          (!quiz.availableFrom || quiz.availableFrom <= now) && 
          (!quiz.availableUntil || quiz.availableUntil >= now);
        
        // Calculate badge status
        let badgeText = "Draft";
        let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
        
        if (quiz.status === "published") {
          if (isAvailable) {
            badgeText = "Available";
            badgeVariant = "default";
          } else if (quiz.availableFrom && quiz.availableFrom > now) {
            badgeText = "Upcoming";
            badgeVariant = "outline";
          } else if (quiz.availableUntil && quiz.availableUntil < now) {
            badgeText = "Expired";
            badgeVariant = "destructive";
          }
        } else if (quiz.status === "archived") {
          badgeText = "Archived";
          badgeVariant = "destructive";
        }
        
        return (
          <Card key={quiz.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <Badge variant={badgeVariant}>{badgeText}</Badge>
              </div>
              <CardDescription>
                {quiz.courseName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{quiz.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{quiz.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{quiz.totalPoints} points</span>
                </div>
                
                {quiz.availableFrom && quiz.availableUntil && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Available from {format(quiz.availableFrom, "MMM d, yyyy")} to {format(quiz.availableUntil, "MMM d, yyyy")}
                  </div>
                )}
                
                {hasAttempted && (
                  <div className="flex items-center mt-2 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    <span>Best score: {performance.bestScore}/{quiz.totalPoints} ({Math.round((performance.bestScore / quiz.totalPoints) * 100)}%)</span>
                  </div>
                )}
                
                {quiz.maxAttempts && performance && (
                  <div className="text-xs text-gray-500">
                    {performance.attempts}/{quiz.maxAttempts} attempts used
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate(`/quiz/${quiz.id}`)} 
                className="w-full"
                disabled={!isAvailable || (quiz.maxAttempts && performance && performance.attempts >= quiz.maxAttempts)}
                variant={isAvailable ? "default" : "outline"}
              >
                {hasAttempted ? "Retry Quiz" : "Start Quiz"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default QuizList;
