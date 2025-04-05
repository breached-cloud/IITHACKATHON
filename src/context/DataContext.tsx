
import React, { createContext, useState } from "react";
import { toast } from "sonner";
import { Course, Announcement, AssignmentSubmission, Enrollment } from "@/types/course";
import { MOCK_COURSES } from "@/data/mockCourses";

// Re-export types for convenience
export type { Course, Module, Content, Announcement, AssignmentSubmission, Enrollment } from "@/types/course";

// Context type
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

// Create the context
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // Course methods
  const addCourse = (course: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
    const newCourse: Course = {
      ...course,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setCourses([...courses, newCourse]);
    toast.success("Course added successfully");
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, ...updates, updatedAt: new Date().toISOString() } 
        : course
    ));
    toast.success("Course updated successfully");
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast.success("Course deleted successfully");
  };

  const getCourseById = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };

  const getCoursesByFaculty = (facultyId: string) => {
    return courses.filter(course => course.facultyId === facultyId);
  };

  // Announcement methods
  const addAnnouncement = (announcement: Omit<Announcement, "id" | "createdAt">) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `a${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setAnnouncements([...announcements, newAnnouncement]);
    toast.success("Announcement published successfully");
  };

  const updateAnnouncement = (announcementId: string, updates: Partial<Announcement>) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === announcementId 
        ? { ...announcement, ...updates } 
        : announcement
    ));
    toast.success("Announcement updated successfully");
  };

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== announcementId));
    toast.success("Announcement deleted successfully");
  };

  const getAnnouncementsByCourse = (courseId: string) => {
    return announcements.filter(announcement => 
      announcement.courseId === courseId || announcement.courseId === undefined
    );
  };
  
  const getAnnouncementsForUser = (userId: string, role: string) => {
    return announcements.filter(announcement => 
      announcement.targetRoles.includes(role as any)
    );
  };

  // Assignment submission methods
  const addSubmission = (submission: Omit<AssignmentSubmission, "id">) => {
    const newSubmission: AssignmentSubmission = {
      ...submission,
      id: `s${Date.now()}`
    };
    
    setSubmissions([...submissions, newSubmission]);
    toast.success("Assignment submitted successfully");
  };

  const updateSubmission = (submissionId: string, updates: Partial<AssignmentSubmission>) => {
    setSubmissions(submissions.map(submission => 
      submission.id === submissionId 
        ? { ...submission, ...updates } 
        : submission
    ));
    toast.success("Submission updated successfully");
  };

  const getSubmissionsByAssignment = (assignmentId: string) => {
    return submissions.filter(submission => submission.assignmentId === assignmentId);
  };

  const getSubmissionsByStudent = (studentId: string) => {
    return submissions.filter(submission => submission.studentId === studentId);
  };

  // Enrollment methods
  const enrollStudent = (enrollment: Omit<Enrollment, "id" | "enrollmentDate" | "progress">) => {
    const newEnrollment: Enrollment = {
      ...enrollment,
      id: `e${Date.now()}`,
      enrollmentDate: new Date().toISOString(),
      progress: 0
    };
    
    setEnrollments([...enrollments, newEnrollment]);
    toast.success("Student enrolled successfully");
  };

  const updateEnrollment = (enrollmentId: string, updates: Partial<Enrollment>) => {
    setEnrollments(enrollments.map(enrollment => 
      enrollment.id === enrollmentId 
        ? { ...enrollment, ...updates } 
        : enrollment
    ));
    toast.success("Enrollment updated successfully");
  };

  const getEnrollmentsByCourse = (courseId: string) => {
    return enrollments.filter(enrollment => enrollment.courseId === courseId);
  };

  const getEnrollmentsByStudent = (studentId: string) => {
    return enrollments.filter(enrollment => enrollment.studentId === studentId);
  };

  return (
    <DataContext.Provider value={{ 
      courses, 
      announcements,
      submissions,
      enrollments,
      addCourse, 
      updateCourse, 
      deleteCourse, 
      getCourseById,
      getCoursesByFaculty,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      getAnnouncementsByCourse,
      getAnnouncementsForUser,
      addSubmission,
      updateSubmission,
      getSubmissionsByAssignment,
      getSubmissionsByStudent,
      enrollStudent,
      updateEnrollment,
      getEnrollmentsByCourse,
      getEnrollmentsByStudent
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Re-export the useData hook
export { useData } from "@/hooks/useDataContext";
