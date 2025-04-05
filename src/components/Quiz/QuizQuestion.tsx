
import React, { useState } from "react";
import { QuizQuestion as QuizQuestionType, UserAnswer } from "@/types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, HelpCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer?: UserAnswer;
  onAnswer: (questionId: string, answer: string | string[]) => void;
  showResult?: boolean;
  isLast?: boolean;
  onNext?: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onAnswer,
  showResult = false,
  isLast = false,
  onNext
}) => {
  const [localAnswer, setLocalAnswer] = useState<string | string[]>(
    answer?.answer || ""
  );
  const [isSaved, setIsSaved] = useState(!!answer?.answer);

  const handleAnswerChange = (value: string) => {
    setLocalAnswer(value);
    onAnswer(question.id, value);
    setIsSaved(true);
  };

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalAnswer(e.target.value);
    setIsSaved(false);
  };

  const handleShortAnswerSubmit = () => {
    if (typeof localAnswer === "string" && localAnswer.trim()) {
      onAnswer(question.id, localAnswer);
      setIsSaved(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3 border-b pb-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold">{question.points}</span>
          </div>
          <div>
            <h3 className="text-xl font-medium">{question.question}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {question.points} {question.points === 1 ? "point" : "points"}
            </div>
          </div>
          {showResult && (
            <div className="flex-shrink-0 mt-1 ml-auto">
              {answer?.isCorrect ? (
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="text-lg font-medium text-red-600 dark:text-red-400">✕</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {question.type === "multiple-choice" && question.options && (
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="pt-6">
            <RadioGroup
              value={localAnswer as string}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {question.options.map((option, index) => {
                const isSelected = localAnswer === option;
                const isCorrect = showResult && question.correctAnswer === option;
                const isIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-md transition-colors",
                      isSelected && !showResult && "bg-blue-50 dark:bg-blue-900/20",
                      isCorrect && "bg-green-50 dark:bg-green-900/20",
                      isIncorrect && "bg-red-50 dark:bg-red-900/20"
                    )}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${question.id}-${index}`}
                      disabled={showResult}
                      className={cn(
                        isCorrect && "border-green-500 text-green-500",
                        isIncorrect && "border-red-500 text-red-500"
                      )}
                    />
                    <Label
                      htmlFor={`option-${question.id}-${index}`}
                      className={cn(
                        "cursor-pointer w-full",
                        isCorrect && "text-green-600 font-medium",
                        isIncorrect && "text-red-600"
                      )}
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {question.type === "true-false" && (
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="pt-6">
            <RadioGroup
              value={localAnswer as string}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {["True", "False"].map((option, index) => {
                const isSelected = localAnswer === option;
                const isCorrect = showResult && question.correctAnswer === option;
                const isIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-md transition-colors",
                      isSelected && !showResult && "bg-blue-50 dark:bg-blue-900/20",
                      isCorrect && "bg-green-50 dark:bg-green-900/20",
                      isIncorrect && "bg-red-50 dark:bg-red-900/20"
                    )}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${question.id}-${index}`}
                      disabled={showResult}
                      className={cn(
                        isCorrect && "border-green-500 text-green-500",
                        isIncorrect && "border-red-500 text-red-500"
                      )}
                    />
                    <Label
                      htmlFor={`option-${question.id}-${index}`}
                      className={cn(
                        "cursor-pointer w-full",
                        isCorrect && "text-green-600 font-medium",
                        isIncorrect && "text-red-600"
                      )}
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {question.type === "short-answer" && (
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="pt-6 space-y-3">
            <Textarea
              placeholder="Type your answer here..."
              value={localAnswer as string}
              onChange={handleShortAnswerChange}
              disabled={showResult}
              className={cn(
                "min-h-[150px] focus:ring-2 transition-all",
                showResult && answer?.isCorrect && "border-green-500 focus:ring-green-200",
                showResult && !answer?.isCorrect && "border-red-500 focus:ring-red-200"
              )}
            />
            {!showResult && (
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {isSaved ? (
                    <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                      <Check className="h-4 w-4" /> Answer saved
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Not saved yet
                    </span>
                  )}
                </div>
                <Button onClick={handleShortAnswerSubmit} variant="outline" size="sm">
                  Save Answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
          <div className="flex gap-2 text-blue-700 dark:text-blue-300 font-medium mb-1">
            <HelpCircle className="h-5 w-5" />
            <span>Explanation</span>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</p>
        </div>
      )}

      {showResult && Array.isArray(question.correctAnswer) && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
          <div className="text-green-700 dark:text-green-300 font-medium mb-1">
            Acceptable answers:
          </div>
          <ul className="text-sm text-green-600 dark:text-green-400 list-disc list-inside">
            {(question.correctAnswer as string[]).map((ans, idx) => (
              <li key={idx}>{ans}</li>
            ))}
          </ul>
        </div>
      )}

      {onNext && (
        <div className="flex justify-end mt-6">
          <Button onClick={onNext} variant="default" className="gap-1">
            {isLast ? "Submit" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
