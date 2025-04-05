import * as z from "zod";
import { UserRole } from "@/types/auth";

// Common validation patterns
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

// Sign up schema with conditional fields based on role
export const signUpSchema = z.object({
  role: z.enum(["student", "faculty", "admin"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").regex(emailPattern, "Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordPattern, "Password must include uppercase, lowercase, and numbers"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
  
  // Student specific fields
  rollNumber: z.string().optional(),
  course: z.string().optional(),
  semester: z.string().optional(),
  
  // Faculty specific fields
  department: z.string().optional(),
  subjectsTaught: z.string().optional(),
  
  // Admin specific fields
  adminKey: z.string().optional(),
  designation: z.string().optional()
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})
.refine(
  data => {
    if (data.role === "student") {
      return !!data.rollNumber && !!data.course && !!data.semester;
    }
    return true;
  },
  {
    message: "Required field for student",
    path: ["rollNumber"]
  }
)
.refine(
  data => {
    if (data.role === "faculty") {
      return !!data.department;
    }
    return true;
  },
  {
    message: "Department is required for faculty",
    path: ["department"]
  }
)
.refine(
  data => {
    if (data.role === "admin") {
      // For now, we're keeping the admin key check for UI validation, but we'll handle it differently
      // in the actual registration process
      return !!data.adminKey && !!data.designation;
    }
    return true;
  },
  {
    message: "Admin verification key is required",
    path: ["adminKey"]
  }
);

// Types based on schemas
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
