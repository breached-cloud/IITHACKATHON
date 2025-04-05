import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/useDataContext";
import { useAuth } from "@/hooks/useAuth";
import { useQuiz } from "@/context/QuizContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { QuizQuestion } from "@/types/quiz";
import { Course } from "@/types/course";

interface QuestionCreatorProps {
  question: QuizQuestion;
  onUpdate: (question: QuizQuestion) => void;
  onDelete: () => void;
}

const QuestionCreator: React.FC<QuestionCreatorProps> = ({ question, onUpdate, onDelete }) => {
  const [questionText, setQuestionText] = useState(question.question || question.text || "");
  const [questionType, setQuestionType] = useState(question.type);
  const [options, setOptions] = useState<string[]>(question.options || []);
  const [correctAnswer, setCorrectAnswer] = useState<string | string[]>(question.correctAnswer || "");
  const [explanation, setExplanation] = useState(question.explanation || "");
  const [points, setPoints] = useState(question.points.toString());

  useEffect(() => {
    onUpdate({
      ...question,
      question: questionText,
      text: questionText,
      type: questionType,
      options,
      correctAnswer,
      explanation,
      points: parseInt(points) || 1
    });
  }, [questionText, questionType, options, correctAnswer, explanation, points]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    
    if (questionType === "multiple-choice" && correctAnswer === options[index]) {
      setCorrectAnswer("");
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <Label className="text-lg font-medium">Question</Label>
          <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
        </div>
        
        <div>
          <Textarea 
            value={questionText} 
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question here"
          />
        </div>
        
        <div>
          <Label htmlFor="questionType">Question Type</Label>
          <Select 
            value={questionType} 
            onValueChange={(value) => setQuestionType(value as "multiple-choice" | "true-false" | "short-answer")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {questionType === "multiple-choice" && (
          <div className="space-y-2">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={option} 
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant={correctAnswer === option ? "default" : "outline"}
                  onClick={() => setCorrectAnswer(option)}
                >
                  Correct
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeOption(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addOption} variant="outline">
              Add Option
            </Button>
          </div>
        )}
        
        {questionType === "true-false" && (
          <div>
            <Label>Correct Answer</Label>
            <div className="flex gap-2 mt-2">
              <Button 
                type="button" 
                variant={correctAnswer === "true" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setCorrectAnswer("true")}
              >
                True
              </Button>
              <Button 
                type="button" 
                variant={correctAnswer === "false" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setCorrectAnswer("false")}
              >
                False
              </Button>
            </div>
          </div>
        )}
        
        {questionType === "short-answer" && (
          <div>
            <Label>Correct Answer(s)</Label>
            <Textarea 
              value={Array.isArray(correctAnswer) ? correctAnswer.join("\n") : correctAnswer} 
              onChange={(e) => setCorrectAnswer(e.target.value.split("\n"))}
              placeholder="Enter one or more correct answers, one per line"
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="explanation">Explanation (Optional)</Label>
          <Textarea 
            id="explanation"
            value={explanation} 
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Provide an explanation for the correct answer"
          />
        </div>
        
        <div>
          <Label htmlFor="points">Points</Label>
          <Input 
            id="points"
            type="number" 
            value={points} 
            onChange={(e) => setPoints(e.target.value)}
            min="1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface QuizCreatorProps {
  existingQuiz?: any;
  facultyCourses?: Course[];
  onCancel?: () => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ existingQuiz, facultyCourses = [], onCancel }) => {
  const navigate = useNavigate();
  const { courses } = useData();
  const { user } = useAuth();
  const { createQuiz } = useQuiz();

  const [quizTitle, setQuizTitle] = useState(existingQuiz?.title || "");
  const [quizDescription, setQuizDescription] = useState(existingQuiz?.description || "");
  const [selectedCourse, setSelectedCourse] = useState(existingQuiz?.courseId ? facultyCourses.find(c => c.id === existingQuiz.courseId) : null);
  const [questions, setQuestions] = useState<QuizQuestion[]>(existingQuiz?.questions || []);
  const [timeLimit, setTimeLimit] = useState(existingQuiz?.timeLimit?.toString() || "60");
  const [randomizeQuestions, setRandomizeQuestions] = useState(existingQuiz?.randomizeQuestions || false);
  const [allowReview, setAllowReview] = useState(existingQuiz?.allowReview !== false);
  const [showLiveScore, setShowLiveScore] = useState(existingQuiz?.showLiveScore || false);
  const [maxAttempts, setMaxAttempts] = useState(existingQuiz?.maxAttempts?.toString() || "1");

  useEffect(() => {
    if (!user || user.role !== "faculty") {
      navigate("/not-authorized");
    }
  }, [user, navigate]);

  const addQuestion = (newQuestion: QuizQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      toast({
        title: "No course selected",
        description: "Please select a course for this quiz",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "No questions added",
        description: "Please add at least one question to the quiz",
        variant: "destructive"
      });
      return;
    }

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    try {
      const newQuiz = {
        title: quizTitle || "Untitled Quiz",
        description: quizDescription,
        courseId: selectedCourse.id,
        courseName: selectedCourse.title,
        questions: questions,
        timeLimit: parseInt(timeLimit) || 0,
        totalPoints: totalPoints,
        randomizeQuestions: randomizeQuestions,
        allowReview: allowReview,
        showLiveScore: showLiveScore,
        maxAttempts: parseInt(maxAttempts) || 0,
        createdBy: user?.id || "",
        status: "published" as const
      };

      createQuiz(newQuiz);

      toast({
        title: "Quiz created successfully",
        description: "Your quiz has been created and is now available to students"
      });

      setTimeout(() => {
        navigate("/quiz");
      }, 1500);
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast({
        title: "Failed to create quiz",
        description: "An error occurred while creating the quiz",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Quiz</CardTitle>
          <CardDescription>Fill in the details below to create a new quiz for your course.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quizTitle">Quiz Title</Label>
              <Input
                type="text"
                id="quizTitle"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="course">Course</Label>
              <Select
                onValueChange={(value) => {
                  const course = facultyCourses?.find(c => c.id === value) || null;
                  setSelectedCourse(course);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {facultyCourses?.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="quizDescription">Quiz Description</Label>
            <Textarea
              id="quizDescription"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                type="number"
                id="timeLimit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxAttempts">Max Attempts</Label>
              <Input
                type="number"
                id="maxAttempts"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="randomizeQuestions">Randomize Questions</Label>
              <Switch
                id="randomizeQuestions"
                checked={randomizeQuestions}
                onCheckedChange={setRandomizeQuestions}
              />
            </div>
            <div>
              <Label htmlFor="allowReview">Allow Review</Label>
              <Switch
                id="allowReview"
                checked={allowReview}
                onCheckedChange={setAllowReview}
              />
            </div>
            <div>
              <Label htmlFor="showLiveScore">Show Live Score</Label>
              <Switch
                id="showLiveScore"
                checked={showLiveScore}
                onCheckedChange={setShowLiveScore}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Questions</h3>
            {questions.map((question, index) => (
              <QuestionCreator
                key={index}
                question={question}
                onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                onDelete={() => deleteQuestion(index)}
              />
            ))}
            <Button
              variant="outline"
              onClick={() => addQuestion({
                id: `question-${Date.now()}`,
                text: "",
                type: "multiple-choice",
                options: [],
                correctAnswer: "",
                points: 1,
                explanation: ""
              })}
            >
              Add Question
            </Button>
          </div>
          
          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Create Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreator;
