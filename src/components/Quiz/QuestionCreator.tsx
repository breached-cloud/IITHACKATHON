
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuizQuestion } from "@/types/quiz";
import { Trash2, Plus } from "lucide-react";

interface QuestionCreatorProps {
  question: QuizQuestion;
  onUpdate: (updatedQuestion: QuizQuestion) => void;
  onDelete: () => void;
}

const QuestionCreator: React.FC<QuestionCreatorProps> = ({
  question,
  onUpdate,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(question.type === "multiple-choice");

  const handleTypeChange = (type: string) => {
    // Convert type to QuestionType
    const questionType = type as "multiple-choice" | "true-false" | "short-answer";
    
    // Update the question type
    const updatedQuestion = {
      ...question,
      type: questionType,
      // Reset options and correctAnswer based on the new type
      options: questionType === "multiple-choice" ? question.options || [] : [],
      correctAnswer: questionType === "true-false" ? "true" : "",
    };
    
    setShowOptions(questionType === "multiple-choice");
    onUpdate(updatedQuestion);
  };

  const handleQuestionTextChange = (text: string) => {
    onUpdate({ ...question, question: text });
  };

  const handlePointsChange = (points: number) => {
    onUpdate({ ...question, points });
  };

  const handleExplanationChange = (explanation: string) => {
    onUpdate({ ...question, explanation });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onUpdate({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (answer: string) => {
    onUpdate({ ...question, correctAnswer: answer });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), ""];
    onUpdate({ ...question, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(index, 1);
    onUpdate({ ...question, options: newOptions });
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid gap-4">
          {/* Question Text */}
          <div>
            <Label htmlFor={`question-${question.id}`}>Question</Label>
            <Textarea
              id={`question-${question.id}`}
              value={question.question || ""}
              onChange={(e) => handleQuestionTextChange(e.target.value)}
              placeholder="Enter your question here"
              className="mt-1"
            />
          </div>

          {/* Question Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`type-${question.id}`}>Question Type</Label>
              <Select 
                value={question.type} 
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor={`points-${question.id}`}>Points</Label>
              <Input
                id={`points-${question.id}`}
                type="number"
                min="1"
                value={question.points}
                onChange={(e) => handlePointsChange(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Options for Multiple Choice questions */}
          {showOptions && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addOption}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Option
                </Button>
              </div>
              
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`correct-${question.id}-${index}`}
                      name={`correct-${question.id}`}
                      checked={question.correctAnswer === option}
                      onChange={() => handleCorrectAnswerChange(option)}
                      className="mr-2"
                    />
                    <Label htmlFor={`correct-${question.id}-${index}`} className="text-sm">
                      Correct
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* True/False options */}
          {question.type === "true-false" && (
            <div>
              <Label>Correct Answer</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`true-${question.id}`}
                    checked={question.correctAnswer === "true"}
                    onChange={() => handleCorrectAnswerChange("true")}
                    className="mr-2"
                  />
                  <Label htmlFor={`true-${question.id}`}>True</Label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`false-${question.id}`}
                    checked={question.correctAnswer === "false"}
                    onChange={() => handleCorrectAnswerChange("false")}
                    className="mr-2"
                  />
                  <Label htmlFor={`false-${question.id}`}>False</Label>
                </div>
              </div>
            </div>
          )}

          {/* Short Answer */}
          {question.type === "short-answer" && (
            <div>
              <Label htmlFor={`answer-${question.id}`}>Correct Answer</Label>
              <Input
                id={`answer-${question.id}`}
                value={typeof question.correctAnswer === "string" ? question.correctAnswer : ""}
                onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                placeholder="Enter the correct answer"
                className="mt-1"
              />
            </div>
          )}

          {/* Explanation */}
          <div>
            <Label htmlFor={`explanation-${question.id}`}>Explanation (optional)</Label>
            <Textarea
              id={`explanation-${question.id}`}
              value={question.explanation || ""}
              onChange={(e) => handleExplanationChange(e.target.value)}
              placeholder="Explain why this answer is correct"
              className="mt-1"
            />
          </div>

          {/* Delete Question Button */}
          <div className="flex justify-end">
            <Button 
              variant="destructive" 
              onClick={onDelete}
              className="flex items-center gap-1"
            >
              <Trash2 size={16} />
              Delete Question
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCreator;
