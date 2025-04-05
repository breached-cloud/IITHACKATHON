
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, User, Users } from "lucide-react";
import { Course } from "@/types/course";
import SplineViewer from "@/components/3D/SplineViewer";

// Collection of sample Spline models for different course categories
const COURSE_SPLINE_MODELS = {
  "programming": "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
  "mathematics": "https://prod.spline.design/uo38MQj-RE98uAZP/scene.splinecode",
  "science": "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
  "default": "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
};

interface CourseCardProps {
  course: Course;
  actionText?: string;
  onAction?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  actionText = "View Course",
  onAction 
}) => {
  const navigate = useNavigate();
  const [showSpline, setShowSpline] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  // Determine which Spline model to use based on course category
  const getSplineModel = () => {
    if (course.category) {
      return COURSE_SPLINE_MODELS[course.category.toLowerCase()] || COURSE_SPLINE_MODELS.default;
    }
    return COURSE_SPLINE_MODELS.default;
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Get a truncated description
  const getTruncatedDescription = (description: string, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  const handleImageHover = () => {
    if (!splineError) {
      setShowSpline(true);
    }
  };

  const handleImageLeave = () => {
    setShowSpline(false);
  };

  const handleSplineError = () => {
    setSplineError(true);
    setShowSpline(false);
  };

  return (
    <Card className="course-card h-full flex flex-col">
      <div 
        className="aspect-video w-full overflow-hidden relative"
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      >
        {showSpline ? (
          <div className="absolute inset-0 z-10">
            <SplineViewer 
              scene={getSplineModel()} 
              className="bg-transparent"
              onError={handleSplineError}
            />
          </div>
        ) : null}
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${showSpline ? 'opacity-30' : 'opacity-100'}`}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <Badge variant="outline" className="bg-elearn-secondary/10 text-elearn-secondary">
            {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {getTruncatedDescription(course.description)}
        </p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <User className="h-4 w-4 mr-2" />
            <span>{course.facultyName}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            <span>{course.enrolledStudents} Students</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Updated {formatDate(course.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-elearn-primary hover:bg-elearn-primary/90"
          onClick={handleAction}
        >
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
