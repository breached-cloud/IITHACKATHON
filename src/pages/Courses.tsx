
import React, { useState } from "react";
import SidebarLayout from "@/components/Layout/SidebarLayout";
import { useData } from "@/context/DataContext";
import CourseCard from "@/components/UI/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Courses: React.FC = () => {
  const { courses } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Courses</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
            </p>
          </div>
          
          {(user?.role === "admin" || user?.role === "faculty") && (
            <Button 
              onClick={() => navigate("/create-course")}
              className="bg-elearn-primary hover:bg-elearn-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" /> Create Course
            </Button>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => setFilterActive(!filterActive)}
            className={filterActive ? "bg-elearn-primary hover:bg-elearn-primary/90" : ""}
          >
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
        
        {filterActive && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <select className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-elearn-primary focus:border-elearn-primary">
                  <option>All Categories</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                </select>
              </div>
              
              <div>
                <Label>Level</Label>
                <select className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-elearn-primary focus:border-elearn-primary">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              
              <div>
                <Label>Sort By</Label>
                <select className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-elearn-primary focus:border-elearn-primary">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Name (A-Z)</option>
                  <option>Name (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setFilterActive(false);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </SidebarLayout>
  );
};

export default Courses;
