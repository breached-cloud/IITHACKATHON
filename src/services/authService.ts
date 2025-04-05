
import { User, UserRole, RegistrationData } from "@/types/auth";

// Simulated login function - in a real app, this would make an API call
export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo data - in a real app, this would come from the backend
  let userData: User;
  
  if (email.includes("student")) {
    userData = {
      id: "s1",
      name: "John Student",
      email: email,
      role: "student",
      avatar: "https://i.pravatar.cc/150?img=12",
      rollNumber: "CS2023001",
      course: "Computer Science",
      semester: "4th"
    };
  } else if (email.includes("faculty")) {
    userData = {
      id: "f1",
      name: "Jane Faculty",
      email: email,
      role: "faculty",
      avatar: "https://i.pravatar.cc/150?img=13",
      department: "Computer Science",
      subjectsTaught: ["Database Systems", "Web Development"]
    };
  } else {
    userData = {
      id: "a1",
      name: "Admin User",
      email: email,
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=14",
      designation: "IT Administrator"
    };
  }
  
  return userData;
};

// Simulated registration function
export const registerUser = async (data: RegistrationData): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate admin key if registering as admin
  if (data.role === "admin" && data.adminKey !== "admin123") {
    throw new Error("Invalid admin verification key");
  }
  
  // Create a new user based on registration data
  const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
  
  let userData: User = {
    id: newUserId,
    name: data.name,
    email: data.email,
    role: data.role,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  };
  
  // Add role-specific fields
  if (data.role === "student") {
    userData.rollNumber = data.rollNumber;
    userData.course = data.course;
    userData.semester = data.semester;
  } else if (data.role === "faculty") {
    userData.department = data.department;
    userData.subjectsTaught = data.subjectsTaught?.split(",").map(subject => subject.trim());
  } else if (data.role === "admin") {
    userData.designation = data.designation;
  }
  
  return userData;
};
