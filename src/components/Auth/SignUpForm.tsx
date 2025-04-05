
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema, SignUpFormValues } from "@/schemas/authSchemas";
import { UserRole } from "@/types/auth";
import CommonFields from "./CommonFields";
import StudentFields from "./StudentFields";
import FacultyFields from "./FacultyFields";
import AdminFields from "./AdminFields";
import { supabase } from "@/integrations/supabase/client";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: selectedRole,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    form.setValue("role", role);
  };

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            role: values.role,
          },
        }
      });

      if (authError) throw authError;
      
      if (authData.user) {
        // Create a profile with role-specific information
        const profileData: any = {
          id: authData.user.id,
          first_name: values.name.split(' ')[0],
          last_name: values.name.split(' ').slice(1).join(' '),
          role: values.role
        };
        
        // Add role-specific fields
        if (values.role === 'student') {
          profileData.roll_number = values.rollNumber;
          profileData.course = values.course;
          profileData.semester = values.semester;
        } else if (values.role === 'faculty') {
          profileData.department = values.department;
          profileData.subjects_taught = values.subjectsTaught?.split(',').map(subject => subject.trim());
        } else if (values.role === 'admin') {
          profileData.designation = values.designation;
        }
        
        // Update the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData);
          
        if (profileError) {
          console.error("Error updating profile:", profileError);
          // Continue even if there's a profile error - the auth worked
        }
      }
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to confirm your account.",
        variant: "default",
      });
      
      // Navigate to dashboard after "successful" registration
      navigate("/dashboard");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong with your registration",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs 
          defaultValue="student" 
          className="w-full" 
          onValueChange={(value) => handleRoleChange(value as UserRole)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          <CommonFields form={form} selectedRole={selectedRole} />
          
          {selectedRole === "student" && <StudentFields form={form} />}
          {selectedRole === "faculty" && <FacultyFields form={form} />}
          {selectedRole === "admin" && <AdminFields form={form} />}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-elearn-primary hover:bg-elearn-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
};

export default SignUpForm;
