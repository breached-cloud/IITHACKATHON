
// Types for our educational content
export interface Course {
  id: string;
  title: string;
  description: string;
  facultyId: string;
  facultyName: string;
  thumbnail: string;
  enrolledStudents: number;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
  category?: string;
  level?: string;
  duration?: string;
  status?: "published" | "draft" | "archived";
}

export interface Module {
  id: string;
  title: string;
  content: Content[];
}

export interface Content {
  id: string;
  type: "video" | "document" | "quiz" | "assignment";
  title: string;
  description: string;
  url?: string;
  dueDate?: string;
  completionStatus?: "not-started" | "in-progress" | "completed";
}

// Types for announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  creatorRole: "admin" | "faculty";
  courseId?: string; // Optional - announcements can be course-specific or general
  targetRoles: ("student" | "faculty" | "admin")[]; // Who should see this announcement
  priority: "normal" | "important" | "urgent";
  expiresAt?: string; // Optional expiration date
}

// Types for assignment submissions
export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  courseId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  fileUrl?: string;
  comment?: string;
  grade?: number;
  feedback?: string;
  status: "submitted" | "graded" | "returned" | "late";
}

// Types for student enrollment
export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrollmentDate: string;
  status: "active" | "completed" | "dropped";
  progress: number; // Percentage of course completed
  lastAccessDate?: string;
}
