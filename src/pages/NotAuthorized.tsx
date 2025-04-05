
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-6">
        <Shield className="h-16 w-16 text-red-500 dark:text-red-300" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        You don't have permission to access this page. This area may be restricted to users with different roles or permissions.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
        
        <Button 
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotAuthorized;
