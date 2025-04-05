
import { Course } from "@/types/course";

// Mock courses
export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    title: "Introduction to Computer Science",
    description: "Learn the fundamentals of computer science and programming",
    facultyId: "2",
    facultyName: "Professor Smith",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 120,
    category: "programming",
    modules: [
      {
        id: "m1",
        title: "Getting Started with Programming",
        content: [
          {
            id: "cont1",
            type: "video",
            title: "Welcome to CS101",
            description: "Introduction to the course and programming concepts",
            url: "https://example.com/video1"
          },
          {
            id: "cont2",
            type: "document",
            title: "Programming Basics",
            description: "An overview of programming fundamentals",
            url: "https://example.com/doc1"
          }
        ]
      }
    ],
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-15T00:00:00Z"
  },
  {
    id: "c2",
    title: "Data Structures and Algorithms",
    description: "Advanced concepts in data structures and algorithmic thinking",
    facultyId: "2",
    facultyName: "Professor Smith",
    thumbnail: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7",
    enrolledStudents: 85,
    category: "programming",
    modules: [
      {
        id: "m2",
        title: "Introduction to Algorithms",
        content: [
          {
            id: "cont3",
            type: "video",
            title: "What is an Algorithm?",
            description: "Understanding the concept of algorithms",
            url: "https://example.com/video2"
          }
        ]
      }
    ],
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2023-10-10T00:00:00Z"
  },
  {
    id: "c3",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites",
    facultyId: "2",
    facultyName: "Professor Smith",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    enrolledStudents: 150,
    category: "programming",
    modules: [
      {
        id: "m3",
        title: "HTML Basics",
        content: [
          {
            id: "cont4",
            type: "video",
            title: "Introduction to HTML",
            description: "Learn the basics of HTML markup",
            url: "https://example.com/video3"
          },
          {
            id: "cont5",
            type: "assignment",
            title: "Build a Simple Webpage",
            description: "Create your first HTML page",
            dueDate: "2023-11-10T00:00:00Z"
          }
        ]
      }
    ],
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2023-11-05T00:00:00Z"
  }
];
