
import React from "react";
import { Quiz, QuizAttempt } from "@/types/quiz";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, XCircle, Clock, Calendar,
  ChevronDown, ChevronUp, Award, BarChart
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface QuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry?: () => void;
  onClose: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  attempt,
  onRetry,
  onClose
}) => {
  const percentage = Math.round((attempt.score / attempt.totalPossibleScore) * 100);
  
  // Determine result status and color
  let resultStatus = "Failed";
  let resultColorClass = "text-red-600";
  
  if (percentage >= 90) {
    resultStatus = "Excellent";
    resultColorClass = "text-green-600";
  } else if (percentage >= 70) {
    resultStatus = "Good";
    resultColorClass = "text-blue-600";
  } else if (percentage >= 50) {
    resultStatus = "Pass";
    resultColorClass = "text-yellow-600";
  }

  const answeredQuestions = attempt.answers.length;
  const timeSpent = attempt.timeSpent || 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>{quiz.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Score summary */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className={cn("text-5xl font-bold mb-2", resultColorClass)}>
                {percentage}%
              </div>
              <div className={cn("text-lg font-medium mb-4", resultColorClass)}>
                {resultStatus}
              </div>
              <div className="text-lg">
                {attempt.score} / {attempt.totalPossibleScore} points
              </div>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">Questions</span>
                </div>
                <div className="text-lg font-medium">
                  {answeredQuestions} / {quiz.questions.length}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Time Spent</span>
                </div>
                <div className="text-lg font-medium">
                  {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">Completed</span>
                </div>
                <div className="text-sm font-medium">
                  {attempt.completedAt 
                    ? format(attempt.completedAt, "MMM d, yyyy h:mm a") 
                    : "Not completed"}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Status</span>
                </div>
                <div className="text-lg font-medium">
                  {percentage >= 50 ? (
                    <span className="text-green-600">Pass</span>
                  ) : (
                    <span className="text-red-600">Fail</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 justify-end">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">Try Again</Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
      
      {/* Question Review */}
      {quiz.allowReview && (
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
            <CardDescription>
              Review your answers and see the correct solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {quiz.questions.map((question, index) => {
                const userAnswer = attempt.answers.find(a => a.questionId === question.id);
                const isCorrect = userAnswer?.isCorrect;
                
                return (
                  <AccordionItem key={question.id} value={question.id}>
                    <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-lg">
                      <div className="flex items-center gap-3 text-left">
                        <div className={cn(
                          "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center",
                          isCorrect 
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {isCorrect ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">Question {index + 1}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {question.question}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-medium">
                            {userAnswer?.pointsEarned || 0}/{question.points}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            points
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-1">Question:</div>
                          <div className="text-gray-700 dark:text-gray-300">{question.question}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-1">Your Answer:</div>
                          <div className={cn(
                            "text-gray-700 dark:text-gray-300",
                            isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          )}>
                            {userAnswer ? (
                              Array.isArray(userAnswer.answer) 
                                ? userAnswer.answer.join(", ")
                                : userAnswer.answer
                            ) : (
                              <span className="text-gray-400 italic">No answer provided</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-1">Correct Answer:</div>
                          <div className="text-green-600 dark:text-green-400">
                            {Array.isArray(question.correctAnswer) 
                              ? question.correctAnswer.join(", ")
                              : question.correctAnswer}
                          </div>
                        </div>
                        
                        {question.explanation && (
                          <div>
                            <div className="text-sm font-medium mb-1">Explanation:</div>
                            <div className="text-gray-700 dark:text-gray-300">
                              {question.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizResults;
