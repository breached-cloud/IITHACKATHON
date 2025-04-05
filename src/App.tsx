import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/hooks/useAuth";
import { DataProvider } from "@/context/DataContext";
import { QuizProvider } from "@/context/QuizContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Assignments from "./pages/Assignments";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import CreateCourse from "./pages/CreateCourse";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRoles = ["student", "faculty", "admin"] }: { 
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasPermission(requiredRoles)) {
    return <Navigate to="/not-authorized" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeProvider>
            <TooltipProvider>
              <DataProvider>
                <QuizProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/contact" element={<Navigate to="/login" replace />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/calendar" element={
                      <ProtectedRoute>
                        <Calendar />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/assignments" element={
                      <ProtectedRoute requiredRoles={["student", "faculty"]}>
                        <Assignments />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/messages" element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses" element={
                      <ProtectedRoute>
                        <Courses />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId" element={
                      <ProtectedRoute>
                        <CourseDetail />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/quiz" element={
                      <ProtectedRoute>
                        <Quiz />
                      </ProtectedRoute>
                    } />
                    <Route path="/quiz/:quizId" element={
                      <ProtectedRoute>
                        <Quiz />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/users" element={
                      <ProtectedRoute requiredRoles={["admin"]}>
                        <div>Users Management Page</div>
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/analytics" element={
                      <ProtectedRoute requiredRoles={["admin", "faculty"]}>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/create-course" element={
                      <ProtectedRoute requiredRoles={["admin", "faculty"]}>
                        <CreateCourse />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </QuizProvider>
              </DataProvider>
            </TooltipProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
