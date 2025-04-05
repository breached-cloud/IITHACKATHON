
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";
import SignUpForm from "@/components/Auth/SignUpForm";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-elearn-primary flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-elearn-primary dark:text-white">EduNexus</h1>
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Register to access your personalized learning platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <SignUpForm />
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-elearn-primary hover:underline">
                Sign in
              </Link>
            </div>
            
            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-gray-600 dark:text-gray-400 hover:text-elearn-primary"
              >
                Back to Home
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
