
import { Course } from "./course";

export type QuestionType = "multiple-choice" | "true-false" | "short-answer";

export interface QuizQuestion {
  id: string;
  question?: string;
  text?: string; // For backward compatibility
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  createdBy: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  availableFrom?: Date;
  availableUntil?: Date;
  totalPoints: number;
  randomizeQuestions: boolean;
  allowReview: boolean;
  showLiveScore: boolean;
  maxAttempts?: number;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  startedAt: Date;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  answers: UserAnswer[];
  score: number;
  totalPossibleScore: number;
  status: "in-progress" | "completed" | "abandoned";
}

export interface StudentQuizPerformance {
  quizId: string;
  quizTitle: string;
  courseName: string;
  bestScore: number;
  totalPossibleScore: number;
  lastAttemptDate: Date;
  attempts: number;
  averageScore: number;
}

export interface QuizAnalytics {
  quizId: string;
  quizTitle: string;
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  averageTimeSpent: number; // in seconds
  questionPerformance: {
    questionId: string;
    question: string;
    correctResponses: number;
    incorrectResponses: number;
    partialResponses?: number;
    averagePoints: number;
  }[];
}
