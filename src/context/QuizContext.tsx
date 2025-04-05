
import React, { createContext, useContext, useReducer } from "react";
import { Quiz, QuizQuestion, QuizAttempt, StudentQuizPerformance, QuizAnalytics } from "@/types/quiz";
import { mockQuizzes, mockQuizAttempts, mockStudentPerformance, mockQuizAnalytics } from "@/data/mockQuizzes";

// Define the state type
interface QuizState {
  availableQuizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  studentPerformance: StudentQuizPerformance[];
  quizAnalytics: QuizAnalytics[];
}

// Define the context type
export interface QuizContextType {
  availableQuizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  studentPerformance: StudentQuizPerformance[];
  quizAnalytics: QuizAnalytics[];
  getQuiz: (quizId: string) => Quiz | null;
  startQuiz: (quizId: string) => void;
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  submitQuiz: () => QuizAttempt | null;
  createQuiz: (quiz: Omit<Quiz, "id" | "createdAt" | "updatedAt">) => Quiz;
  updateQuiz: (quiz: Quiz) => Quiz;
}

// Define the action types
type QuizAction =
  | { type: "SET_QUIZZES"; payload: Quiz[] }
  | { type: "START_QUIZ"; payload: { quiz: Quiz, attempt: QuizAttempt } }
  | { type: "SUBMIT_ANSWER"; payload: { questionId: string; answer: string | string[] } }
  | { type: "SUBMIT_QUIZ" }
  | { type: "CREATE_QUIZ"; payload: Quiz }
  | { type: "UPDATE_QUIZ"; payload: Quiz };

// Define the initial state
const initialState: QuizState = {
  availableQuizzes: mockQuizzes,
  currentQuiz: null,
  currentAttempt: null,
  studentPerformance: mockStudentPerformance,
  quizAnalytics: mockQuizAnalytics
};

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Create a reducer function
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "SET_QUIZZES":
      return { ...state, availableQuizzes: action.payload };
    case "START_QUIZ":
      return {
        ...state,
        currentQuiz: action.payload.quiz,
        currentAttempt: action.payload.attempt
      };
    case "SUBMIT_ANSWER": {
      if (!state.currentAttempt) return state;
      
      const updatedAnswers = [...state.currentAttempt.answers];
      const existingAnswerIndex = updatedAnswers.findIndex(
        a => a.questionId === action.payload.questionId
      );
      
      if (existingAnswerIndex >= 0) {
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          answer: action.payload.answer
        };
      } else {
        updatedAnswers.push({
          questionId: action.payload.questionId,
          answer: action.payload.answer
        });
      }
      
      return {
        ...state,
        currentAttempt: {
          ...state.currentAttempt,
          answers: updatedAnswers
        }
      };
    }
    case "SUBMIT_QUIZ": {
      if (!state.currentQuiz || !state.currentAttempt) return state;
      
      // Calculate score and mark answers as correct/incorrect
      const answers = state.currentAttempt.answers.map(answer => {
        const question = state.currentQuiz!.questions.find(q => q.id === answer.questionId);
        if (!question) return answer;
        
        let isCorrect = false;
        let pointsEarned = 0;
        
        if (Array.isArray(question.correctAnswer)) {
          // For multiple correct answers (like short-answer questions)
          if (Array.isArray(answer.answer)) {
            isCorrect = question.correctAnswer.some(ca => 
              answer.answer.includes(ca));
          } else {
            isCorrect = question.correctAnswer.includes(answer.answer);
          }
        } else {
          // For single correct answer
          isCorrect = answer.answer === question.correctAnswer;
        }
        
        pointsEarned = isCorrect ? question.points : 0;
        
        return {
          ...answer,
          isCorrect,
          pointsEarned
        };
      });
      
      const score = answers.reduce((total, a) => total + (a.pointsEarned || 0), 0);
      const completedAttempt: QuizAttempt = {
        ...state.currentAttempt,
        answers,
        completedAt: new Date(),
        timeSpent: Math.floor((new Date().getTime() - state.currentAttempt.startedAt.getTime()) / 1000),
        status: "completed",
        score,
        totalPossibleScore: state.currentQuiz.totalPoints
      };
      
      // Update student performance
      let performance = state.studentPerformance.find(p => p.quizId === state.currentQuiz!.id);
      const updatedPerformance = [...state.studentPerformance];
      
      if (performance) {
        // Update existing performance record
        const performanceIndex = updatedPerformance.findIndex(p => p.quizId === state.currentQuiz!.id);
        const totalScore = performance.averageScore * performance.attempts + score;
        const newAttempts = performance.attempts + 1;
        
        updatedPerformance[performanceIndex] = {
          ...performance,
          lastAttemptDate: new Date(),
          attempts: newAttempts,
          averageScore: totalScore / newAttempts,
          bestScore: Math.max(performance.bestScore, score)
        };
      } else {
        // Create new performance record
        updatedPerformance.push({
          quizId: state.currentQuiz.id,
          quizTitle: state.currentQuiz.title,
          courseName: state.currentQuiz.courseName,
          bestScore: score,
          totalPossibleScore: state.currentQuiz.totalPoints,
          lastAttemptDate: new Date(),
          attempts: 1,
          averageScore: score
        });
      }
      
      return {
        ...state,
        currentAttempt: completedAttempt,
        studentPerformance: updatedPerformance
      };
    }
    case "CREATE_QUIZ":
      return {
        ...state,
        availableQuizzes: [...state.availableQuizzes, action.payload]
      };
    case "UPDATE_QUIZ": {
      const updatedQuizzes = state.availableQuizzes.map(quiz => 
        quiz.id === action.payload.id ? action.payload : quiz
      );
      
      return {
        ...state,
        availableQuizzes: updatedQuizzes,
        currentQuiz: state.currentQuiz?.id === action.payload.id ? action.payload : state.currentQuiz
      };
    }
    default:
      return state;
  }
};

// Create a provider component
interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Provide implementations of the context methods
  const getQuiz = (quizId: string): Quiz | null => {
    return state.availableQuizzes.find(quiz => quiz.id === quizId) || null;
  };
  
  const startQuiz = (quizId: string): void => {
    const quiz = getQuiz(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    
    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      userId: "user123", // This would come from auth context in a real app
      userName: "Current User", // This would come from auth context in a real app
      startedAt: new Date(),
      answers: [],
      score: 0,
      totalPossibleScore: quiz.totalPoints,
      status: "in-progress"
    };
    
    dispatch({ type: "START_QUIZ", payload: { quiz, attempt: newAttempt } });
  };
  
  const submitAnswer = (questionId: string, answer: string | string[]): void => {
    dispatch({ 
      type: "SUBMIT_ANSWER", 
      payload: { questionId, answer }
    });
  };
  
  const submitQuiz = (): QuizAttempt | null => {
    if (!state.currentAttempt) {
      throw new Error("No active quiz attempt");
    }
    
    dispatch({ type: "SUBMIT_QUIZ" });
    return state.currentAttempt;
  };
  
  const createQuiz = (quizData: Omit<Quiz, "id" | "createdAt" | "updatedAt">): Quiz => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    dispatch({ type: "CREATE_QUIZ", payload: newQuiz });
    return newQuiz;
  };
  
  const updateQuiz = (quiz: Quiz): Quiz => {
    const updatedQuiz = {
      ...quiz,
      updatedAt: new Date()
    };
    
    dispatch({ type: "UPDATE_QUIZ", payload: updatedQuiz });
    return updatedQuiz;
  };
  
  const value: QuizContextType = {
    availableQuizzes: state.availableQuizzes,
    currentQuiz: state.currentQuiz,
    currentAttempt: state.currentAttempt,
    studentPerformance: state.studentPerformance,
    quizAnalytics: state.quizAnalytics,
    getQuiz,
    startQuiz,
    submitAnswer,
    submitQuiz,
    createQuiz,
    updateQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

// Create a custom hook to use the context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
