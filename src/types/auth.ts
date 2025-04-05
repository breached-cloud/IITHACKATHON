
export type UserRole = "student" | "faculty" | "admin";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  criteria: string;
  earnedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  title?: string;
  bio?: string;
  // Student specific fields
  rollNumber?: string;
  course?: string;
  semester?: string;
  // Faculty specific fields
  subjectsTaught?: string[];
  // Admin specific fields
  designation?: string;
  // Gamification fields
  points?: number;
  achievements?: Achievement[];
  badges?: Badge[];
  rank?: number;
  level?: number;
  streak?: number;
  lastActive?: Date;
}

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  [key: string]: any;
}
