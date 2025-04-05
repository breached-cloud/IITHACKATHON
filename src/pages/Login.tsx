
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading, error, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  // If already authenticated, redirect to appropriate dashboard based on role
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}!`,
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInProgress(true);
    
    try {
      await login(email, password);
      // The redirect will happen in the useEffect when auth state changes
    } catch (err) {
      console.error("Login error", err);
    } finally {
      setLoginInProgress(false);
    }
  };
  
  const loginAsRole = async (role: 'student' | 'faculty' | 'admin') => {
    setLoginInProgress(true);
    let demoEmail;
    
    switch (role) {
      case 'student':
        demoEmail = 'student@example.com';
        break;
      case 'faculty':
        demoEmail = 'faculty@example.com';
        break;
      case 'admin':
        demoEmail = 'admin@example.com';
        break;
    }
    
    try {
      await login(demoEmail, 'password');
      // The redirect will happen in the useEffect when auth state changes
    } catch (err) {
      console.error("Login error", err);
    } finally {
      setLoginInProgress(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-white">EduNexus</h1>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a 
                      href="#" 
                      className="text-sm text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Password Recovery",
                          description: "For this demo, use 'password' for all accounts."
                        });
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginInProgress}
                >
                  {loginInProgress ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Quick Demo Login
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={() => loginAsRole('student')}
                className="w-full"
                disabled={loginInProgress}
              >
                Student
              </Button>
              <Button 
                variant="outline" 
                onClick={() => loginAsRole('faculty')}
                className="w-full"
                disabled={loginInProgress}
              >
                Faculty
              </Button>
              <Button 
                variant="outline" 
                onClick={() => loginAsRole('admin')}
                className="w-full"
                disabled={loginInProgress}
              >
                Admin
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
