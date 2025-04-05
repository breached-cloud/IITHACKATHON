
import { GraduationCap, Users, Database, BookOpen, BarChart, Video, Award, Zap } from "lucide-react";
import React from "react";

export interface FeatureItem {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  highlight?: boolean;
}

export const featuresData: FeatureItem[] = [
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description: "Adaptive curriculum that adjusts to each student's learning pace and style for optimal engagement.",
    highlight: true
  },
  {
    icon: Database,
    title: "Content Management",
    description: "Powerful tools for creating, organizing, and distributing educational content across your institution.",
  },
  {
    icon: Users,
    title: "Collaborative Spaces",
    description: "Foster teamwork with discussion forums, group projects, and real-time collaborative tools.",
  },
  {
    icon: BookOpen,
    title: "Interactive Assignments",
    description: "Create engaging assignments with multimedia elements, auto-grading, and detailed feedback.",
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description: "Comprehensive dashboards with actionable insights on student performance and engagement.",
    highlight: true
  },
  {
    icon: Video,
    title: "Video Conferencing",
    description: "Integrated virtual classroom with recording, screen sharing, and interactive whiteboard.",
  },
  {
    icon: Award,
    title: "Gamification Elements",
    description: "Badges, leaderboards, and achievement systems to increase motivation and participation.",
  },
  {
    icon: Zap,
    title: "AI-Powered Support",
    description: "Intelligent tutoring systems and automated assistance for students and educators.",
  }
];
