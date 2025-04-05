
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  hasPermission: (roles: UserRole[]) => boolean;
  updateUserProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  hasPermission: () => false,
  updateUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // On mount, check if we have a Supabase session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          
          // Get user profile data including role from Supabase
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error("Error fetching profile:", profileError);
          }
          
          // Build our user object with both auth and profile data
          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata.name || 'User',
            email: session.user.email || '',
            role: profileData?.role || session.user.user_metadata.role || 'student',
            // Add role-specific fields from profile data
            ...(profileData?.avatar_url && { avatar: profileData.avatar_url }),
            ...(profileData?.department && { department: profileData.department }),
            ...(profileData?.subjects_taught && { subjectsTaught: profileData.subjects_taught }),
            ...(profileData?.designation && { designation: profileData.designation }),
            ...(profileData?.roll_number && { rollNumber: profileData.roll_number }),
            ...(profileData?.course && { course: profileData.course }),
            ...(profileData?.semester && { semester: profileData.semester }),
          };
          
          setUser(userData);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        
        // Get user profile data including role from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }
        
        // Build our user object with both auth and profile data
        const userData: User = {
          id: session.user.id,
          name: session.user.user_metadata.name || 'User',
          email: session.user.email || '',
          role: profileData?.role || session.user.user_metadata.role || 'student',
          // Add role-specific fields from profile data
          ...(profileData?.avatar_url && { avatar: profileData.avatar_url }),
          ...(profileData?.department && { department: profileData.department }),
          ...(profileData?.subjects_taught && { subjectsTaught: profileData.subjects_taught }),
          ...(profileData?.designation && { designation: profileData.designation }),
          ...(profileData?.roll_number && { rollNumber: profileData.roll_number }),
          ...(profileData?.course && { course: profileData.course }),
          ...(profileData?.semester && { semester: profileData.semester }),
        };
        
        setUser(userData);
      }
      
      setIsLoading(false);
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const hasPermission = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Don't need to manually set user/session here as the onAuthStateChange listener will handle it
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Don't need to manually clear user state as the onAuthStateChange listener will handle it
    } catch (err: any) {
      console.error("Error signing out:", err);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Let SignUpForm handle registration with Supabase directly
      console.log("Registration called from context:", userData);
      // We don't need to do anything here as the signup form handles this
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (profileData: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user?.id) throw new Error("No user logged in");
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.name?.split(' ')[0],
          last_name: profileData.name?.split(' ').slice(1).join(' '),
          department: profileData.department,
          subjects_taught: profileData.subjectsTaught,
          designation: profileData.designation,
          roll_number: profileData.rollNumber,
          course: profileData.course,
          semester: profileData.semester,
          bio: profileData.bio,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setUser({...user, ...profileData});
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      error, 
      login, 
      logout, 
      register, 
      hasPermission,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
