
import { UserRole } from "@/types/auth";
import {
  Book,
  FilePlus,
  Users,
  User,
  BarChart,
  Home,
  Settings,
  CheckCircle,
  Calendar,
  Inbox,
  FileQuestion
} from "lucide-react";

export interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

export const navigationItems: NavItem[] = [
  { name: "Dashboard", icon: Home, path: "/dashboard", roles: ["admin", "faculty", "student"] },
  { name: "Courses", icon: Book, path: "/courses", roles: ["admin", "faculty", "student"] },
  { name: "Create Course", icon: FilePlus, path: "/create-course", roles: ["admin", "faculty"] },
  { name: "Users", icon: Users, path: "/users", roles: ["admin"] },
  { name: "Profile", icon: User, path: "/profile", roles: ["admin", "faculty", "student"] },
  { name: "Analytics", icon: BarChart, path: "/analytics", roles: ["admin", "faculty"] },
  { name: "Calendar", icon: Calendar, path: "/calendar", roles: ["admin", "faculty", "student"] },
  { name: "Assignments", icon: CheckCircle, path: "/assignments", roles: ["faculty", "student"] },
  { name: "Messages", icon: Inbox, path: "/messages", roles: ["admin", "faculty", "student"] },
  { name: "Quizzes", icon: FileQuestion, path: "/quiz", roles: ["admin", "faculty", "student"] },
  { name: "Settings", icon: Settings, path: "/settings", roles: ["admin", "faculty", "student"] },
];
