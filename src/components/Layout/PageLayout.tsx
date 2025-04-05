
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/auth";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  requiredRoles = ["student", "faculty", "admin"],
  title
}) => {
  const { hasPermission, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is authenticated and has permission
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (!hasPermission(requiredRoles)) {
        toast({
          title: "Access Denied",
          description: `You don't have permission to access this page. You are logged in as a ${user?.role}.`,
          variant: "destructive"
        });
        navigate('/not-authorized');
      }
    }
  }, [isAuthenticated, isLoading, hasPermission, requiredRoles, navigate, toast, user?.role]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (!hasPermission(requiredRoles)) {
    return null; // Will redirect to not-authorized
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {title && (
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </header>
        )}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
