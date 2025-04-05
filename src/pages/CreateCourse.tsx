
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/useDataContext";
import { useAuth } from "@/hooks/useAuth";
import PageLayout from "@/components/Layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Mock upload button for the time being
const UploadButton = ({ endpoint, onClientUploadComplete, onUploadError }) => {
  const handleUpload = () => {
    // Simulate successful upload with a placeholder image
    const mockResult = [{ url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97" }];
    onClientUploadComplete(mockResult);
  };

  return (
    <Button type="button" variant="outline" onClick={handleUpload}>
      Upload Image
    </Button>
  );
};

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { addCourse } = useData();
  const { user } = useAuth();
  
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [courseCategory, setCourseCategory] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [courseThumbnail, setCourseThumbnail] = useState<string>("");
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      // Default values for title and modules if not provided
      const title = courseTitle || "Untitled Course"; // Ensure title is not optional
      
      const courseData = {
        title: title,
        description: courseDescription,
        category: courseCategory,
        level: courseLevel,
        duration: courseDuration,
        thumbnail: courseThumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", // Default thumbnail
        facultyId: user?.id || "",
        facultyName: user?.name || "",
        enrolledStudents: 0,
        modules: [
          {
            id: "module-1",
            title: "Getting Started",
            description: "Welcome to the course",
            content: []
          }
        ]
      };
      
      if (!title) {
        toast({
          title: "Error",
          description: "Course title is required",
          variant: "destructive"
        });
        return;
      }
      
      addCourse(courseData);
      
      toast({
        title: "Success",
        description: "Course created successfully",
      });
      
      // Wait for toast to show before navigating
      setTimeout(() => {
        navigate("/courses");
      }, 2000);
      
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to create course",
        variant: "destructive"
      });
    }
  };

  return (
    <PageLayout title="Create New Course" requiredRoles={["admin", "faculty"]}>
      <div className="container max-w-4xl mx-auto mt-8">
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                  Course Title
                </Label>
                <Input
                  type="text"
                  id="courseTitle"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
                  Course Description
                </Label>
                <Textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="courseCategory" className="block text-sm font-medium text-gray-700">
                  Category
                </Label>
                <Input
                  type="text"
                  id="courseCategory"
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700">
                  Level
                </Label>
                <Select onValueChange={setCourseLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                  Duration
                </Label>
                <Input
                  type="text"
                  id="courseDuration"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Course Thumbnail
                </Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      setCourseThumbnail(res[0].url);
                      toast({
                        title: "Upload Complete",
                        description: "Thumbnail uploaded successfully!",
                      });
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: "Upload Failed",
                      description: `Something went wrong: ${error.message}`,
                      variant: "destructive",
                    });
                  }}
                />
                {courseThumbnail && (
                  <img
                    src={courseThumbnail}
                    alt="Course Thumbnail"
                    className="mt-2 w-32 h-auto rounded-md"
                  />
                )}
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Create Course
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreateCourse;
