
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { UserRole } from "@/types/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Re-export the UserRole type directly
export type { UserRole };
