
import { useContext } from 'react';
import { DataContext } from '@/context/DataContext';
import { Course, Announcement, AssignmentSubmission, Enrollment } from '@/types/course';

interface DataContextType {
  courses: Course[];
  announcements: Announcement[];
  submissions: AssignmentSubmission[];
  enrollments: Enrollment[];
  
  // Course methods
  addCourse: (course: Omit<Course, "id" | "createdAt" | "updatedAt">) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  getCourseById: (courseId: string) => Course | undefined;
  getCoursesByFaculty: (facultyId: string) => Course[];
  
  // Announcement methods
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  updateAnnouncement: (announcementId: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (announcementId: string) => void;
  getAnnouncementsByCourse: (courseId: string) => Announcement[];
  getAnnouncementsForUser: (userId: string, role: string) => Announcement[];
  
  // Assignment submission methods
  addSubmission: (submission: Omit<AssignmentSubmission, "id">) => void;
  updateSubmission: (submissionId: string, updates: Partial<AssignmentSubmission>) => void;
  getSubmissionsByAssignment: (assignmentId: string) => AssignmentSubmission[];
  getSubmissionsByStudent: (studentId: string) => AssignmentSubmission[];
  
  // Enrollment methods
  enrollStudent: (enrollment: Omit<Enrollment, "id" | "enrollmentDate" | "progress">) => void;
  updateEnrollment: (enrollmentId: string, updates: Partial<Enrollment>) => void;
  getEnrollmentsByCourse: (courseId: string) => Enrollment[];
  getEnrollmentsByStudent: (studentId: string) => Enrollment[];
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context as DataContextType;
};
