import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useDataContext";
import PageLayout from "@/components/Layout/PageLayout";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { 
  ArrowLeft, Clock, ListOrdered, Eye, Calendar,
  ChevronLeft, ChevronRight, CheckCircle, AlertCircle,
  Plus, Timer, HelpCircle, ClipboardList, ArrowRight
} from "lucide-react";
import { QuizQuestion as QuizQuestionType, Quiz as QuizType, QuizAttempt } from "@/types/quiz";
import QuizList from "@/components/Quiz/QuizList";
import QuizQuestion from "@/components/Quiz/QuizQuestion";
import QuizTimer from "@/components/Quiz/QuizTimer";
import QuizProgressBar from "@/components/Quiz/QuizProgressBar";
import QuizResults from "@/components/Quiz/QuizResults";
import QuizCreator from "@/components/Quiz/QuizCreator";
import QuizAnalytics from "@/components/Quiz/QuizAnalytics";
import { cn } from "@/lib/utils";

const Quiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { 
    availableQuizzes, getQuiz, startQuiz, submitAnswer, 
    submitQuiz, currentAttempt, quizAnalytics,
    studentPerformance
  } = useQuiz();
  const { user } = useAuth();
  const { courses } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [questionsToShow, setQuestionsToShow] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [displayMode, setDisplayMode] = useState<"taking" | "creating" | "results" | "analytics" | "list">("list");
  const [createMode, setCreateMode] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (quizId) {
      const foundQuiz = getQuiz(quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        
        if (currentAttempt && currentAttempt.quizId === quizId) {
          setDisplayMode("taking");
          
          let questions = [...foundQuiz.questions];
          if (foundQuiz.randomizeQuestions) {
            questions = [...questions].sort(() => Math.random() - 0.5);
          }
          setQuestionsToShow(questions);
          
          const answered = currentAttempt.answers.map(a => {
            const idx = questions.findIndex(q => q.id === a.questionId);
            return idx + 1;
          });
          setAnsweredQuestions(answered);
        } else if (user?.role === "faculty" && foundQuiz.createdBy === user.id) {
          setDisplayMode("creating");
        } else {
          setDisplayMode("list");
        }
      } else {
        toast({
          title: "Quiz Not Found",
          description: "The quiz you're looking for doesn't exist or you don't have access to it",
          variant: "destructive"
        });
        navigate("/quiz");
      }
    } else {
      setDisplayMode("list");
    }
  }, [quizId, getQuiz, navigate, toast, currentAttempt, user]);

  const handleStartQuiz = () => {
    if (!quiz) return;
    
    try {
      startQuiz(quiz.id);
      
      if (quiz.timeLimit) {
        toast({
          title: "Quiz Started",
          description: `You have ${quiz.timeLimit} minutes to complete this quiz`,
        });
      }
      
      let questions = [...quiz.questions];
      if (quiz.randomizeQuestions) {
        questions = [...questions].sort(() => Math.random() - 0.5);
      }
      setQuestionsToShow(questions);
      
      setDisplayMode("taking");
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setAnsweredQuestions([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start quiz",
        variant: "destructive"
      });
    }
  };

  const handleAnswerSubmit = (questionId: string, answer: string | string[]) => {
    try {
      submitAnswer(questionId, answer);
      
      const questionNum = currentQuestionIndex + 1;
      if (!answeredQuestions.includes(questionNum)) {
        setAnsweredQuestions(prev => [...prev, questionNum]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit answer",
        variant: "destructive"
      });
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsToShow.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleShowSubmitConfirmation();
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Your quiz time has expired. Your answers are being submitted.",
      variant: "destructive"
    });
    
    handleSubmitQuiz();
  };

  const handleShowSubmitConfirmation = () => {
    if (!currentAttempt) return;
    
    const answeredQuestions = currentAttempt.answers.length;
    const totalQuestions = questionsToShow.length;
    
    if (answeredQuestions < totalQuestions) {
      toast({
        title: "Warning",
        description: `You've only answered ${answeredQuestions} out of ${totalQuestions} questions. Are you sure you want to submit?`,
        action: (
          <Button 
            variant="default" 
            onClick={handleSubmitQuiz}
            className="bg-red-600 hover:bg-red-700"
          >
            Submit Anyway
          </Button>
        ),
      });
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    try {
      const result = submitQuiz();
      
      if (result && quiz) {
        setShowResults(true);
        setDisplayMode("results");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit quiz",
        variant: "destructive"
      });
    }
  };

  const renderQuizList = () => {
    const roleHeading = 
      user?.role === "student" ? "Available Quizzes" :
      user?.role === "faculty" ? "Your Quizzes" : "All Quizzes";
      
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{roleHeading}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {user?.role === "student" 
                ? "View and take quizzes for your courses" 
                : "Create and manage quizzes for your courses"}
            </p>
          </div>
          
          {(user?.role === "faculty" || user?.role === "admin") && (
            <Button onClick={() => {
              setCreateMode(true);
              setDisplayMode("creating");
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Quiz
            </Button>
          )}
        </div>
        
        {user?.role === "faculty" && (
          <Tabs defaultValue="published">
            <TabsList>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="published" className="pt-6">
              <QuizList />
            </TabsContent>
            
            <TabsContent value="drafts" className="pt-6">
              <QuizList />
            </TabsContent>
            
            <TabsContent value="analytics" className="pt-6">
              {quizAnalytics && quizAnalytics.length > 0 ? (
                <div className="space-y-6">
                  {quizAnalytics.map(analytics => (
                    <Card key={analytics.quizId}>
                      <CardHeader>
                        <CardTitle>{analytics.quizTitle}</CardTitle>
                        <CardDescription>
                          {analytics.totalAttempts} attempts, {analytics.averageScore.toFixed(1)}% average score
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <QuizAnalytics analytics={analytics} />
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/quiz/${analytics.quizId}/analytics`)}
                        >
                          View Full Analytics
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Analytics Available</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Analytics will be available once students have attempted your quizzes.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        
        {(user?.role === "student" || user?.role === "admin") && (
          <QuizList />
        )}
        
        {user?.role === "student" && studentPerformance && studentPerformance.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Your Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentPerformance.map(perf => (
                <Card key={perf.quizId}>
                  <CardHeader>
                    <CardTitle>{perf.quizTitle}</CardTitle>
                    <CardDescription>{perf.courseName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Best Score:</span>
                        <span className="font-medium">{perf.bestScore}/{perf.totalPossibleScore} ({Math.round((perf.bestScore / perf.totalPossibleScore) * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Attempts:</span>
                        <span className="font-medium">{perf.attempts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Last Attempt:</span>
                        <span className="font-medium">{perf.lastAttemptDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/quiz/${perf.quizId}`)}
                    >
                      View Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderQuizDetails = () => {
    if (!quiz) return null;
    
    const performance = studentPerformance.find(p => p.quizId === quiz.id);
    const hasAttempted = !!performance;
    
    const now = new Date();
    const isAvailable = 
      quiz.status === "published" && 
      (!quiz.availableFrom || quiz.availableFrom <= now) && 
      (!quiz.availableUntil || quiz.availableUntil >= now);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/quiz")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <Badge variant={quiz.status === "published" ? "default" : "secondary"}>
            {quiz.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
        
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md">
          <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-16 w-full" />
          
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-blue-500" />
              {quiz.title}
            </CardTitle>
            <CardDescription>{quiz.courseName}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300">{quiz.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Time Limit</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {quiz.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <ListOrdered className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Questions</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {quiz.questions.length} questions, {quiz.totalPoints} total points
                    </p>
                  </div>
                </div>
                
                {quiz.availableFrom && quiz.availableUntil && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Availability</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        From {quiz.availableFrom.toLocaleDateString()} to {quiz.availableUntil.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <Eye className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Review</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {quiz.allowReview ? "You can review your answers after submission" : "No review available"}
                    </p>
                  </div>
                </div>
              </div>
              
              {hasAttempted && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Previous Attempts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best score: <span className="font-medium text-gray-900 dark:text-gray-100">
                          {performance?.bestScore}/{quiz.totalPoints} ({Math.round((performance!.bestScore / quiz.totalPoints) * 100)}%)
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Attempts: <span className="font-medium text-gray-900 dark:text-gray-100">{performance?.attempts || 0}</span>
                      </p>
                    </div>
                    
                    {quiz.maxAttempts && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {performance && quiz.maxAttempts <= performance.attempts ? (
                          <span className="text-red-600">No attempts remaining</span>
                        ) : (
                          <span>
                            Attempts remaining: <span className="font-medium text-gray-900 dark:text-gray-100">
                              {quiz.maxAttempts - (performance?.attempts || 0)}
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-gray-50 dark:bg-gray-900/50">
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:justify-end">
              <Button 
                onClick={handleStartQuiz}
                disabled={!isAvailable || (quiz.maxAttempts && performance && performance.attempts >= quiz.maxAttempts)}
                className="gap-2"
              >
                {hasAttempted ? "Retry Quiz" : "Start Quiz"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderQuizTaking = () => {
    if (!quiz || !currentAttempt) return null;
    
    const currentQuestion = questionsToShow[currentQuestionIndex];
    const userAnswer = currentAttempt.answers.find(a => a.questionId === currentQuestion.id);
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-white dark:bg-gray-900 py-4 z-10 border-b">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                toast({
                  title: "Quiz in Progress",
                  description: "Are you sure you want to leave? Your progress will be saved.",
                  action: (
                    <Button 
                      variant="default" 
                      onClick={() => navigate("/quiz")}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Leave Quiz
                    </Button>
                  ),
                });
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">{quiz.title}</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {quiz.timeLimit && (
              <QuizTimer 
                timeLimit={quiz.timeLimit} 
                onTimeUp={handleTimeUp} 
              />
            )}
            
            <div className="flex-grow sm:flex-grow-0">
              <QuizProgressBar 
                currentQuestion={currentQuestionIndex + 1} 
                totalQuestions={questionsToShow.length}
                answeredQuestions={answeredQuestions}
              />
            </div>
          </div>
        </div>
        
        <Card className="border border-gray-200 dark:border-gray-800 shadow-md">
          <CardContent className="pt-6">
            <QuizQuestion 
              question={currentQuestion}
              answer={userAnswer}
              onAnswer={handleAnswerSubmit}
              onNext={goToNextQuestion}
              isLast={currentQuestionIndex === questionsToShow.length - 1}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShowSubmitConfirmation}
            className="gap-1"
          >
            Submit Quiz 
            <HelpCircle className="h-4 w-4 ml-1" />
          </Button>
          
          <Button 
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questionsToShow.length - 1}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="hidden md:block">
          <Card className="border border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Question Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {questionsToShow.map((_, idx) => (
                  <Button
                    key={idx}
                    variant={idx === currentQuestionIndex ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-10 h-10 p-0",
                      answeredQuestions.includes(idx + 1) && idx !== currentQuestionIndex && 
                      "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                    )}
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-gray-500">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };

  const renderQuizResults = () => {
    if (!quiz || !currentAttempt) return null;
    
    return (
      <div>
        <QuizResults 
          quiz={quiz}
          attempt={currentAttempt}
          onRetry={() => handleStartQuiz()}
          onClose={() => navigate("/quiz")}
        />
      </div>
    );
  };

  const renderQuizCreation = () => {
    if (quizId && quiz && !createMode) {
      return <QuizCreator existingQuiz={quiz} facultyCourses={courses?.filter(c => c.facultyId === user?.id)} onCancel={() => {
        setDisplayMode("list");
      }} />;
    }
    
    return <QuizCreator facultyCourses={courses?.filter(c => c.facultyId === user?.id)} onCancel={() => {
      setDisplayMode("list");
      setCreateMode(false);
    }} />;
  };

  const renderQuizAnalytics = () => {
    if (!quizId) return null;
    
    const analytics = quizAnalytics.find(a => a.quizId === quizId);
    if (!analytics) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/quiz")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{analytics.quizTitle} - Analytics</h1>
        </div>
        
        <QuizAnalytics analytics={analytics} />
      </div>
    );
  };

  const renderContent = () => {
    if (!quizId && createMode) {
      return renderQuizCreation();
    }
    
    if (!quizId) {
      return renderQuizList();
    }
    
    if (displayMode === "taking") {
      return renderQuizTaking();
    }
    
    if (displayMode === "results") {
      return renderQuizResults();
    }
    
    if (displayMode === "creating") {
      return renderQuizCreation();
    }
    
    if (displayMode === "analytics") {
      return renderQuizAnalytics();
    }
    
    return renderQuizDetails();
  };

  return (
    <PageLayout title="">
      {renderContent()}
    </PageLayout>
  );
};

export default Quiz;
