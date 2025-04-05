import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/Layout/SidebarLayout";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Book, Video, FileText, CheckCircle, User, Clock, ArrowLeft, Edit, Trash, PlayCircle, FileIcon, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, deleteCourse } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(getCourseById(courseId || ""));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    const fetchCourseFromSupabase = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
          
        if (error) {
          console.error("Error fetching course:", error);
          if (!course) {
            setError("Could not load course data");
          }
        } else if (data) {
          const supabaseCourse = {
            id: data.id,
            title: data.title,
            description: data.description,
            facultyName: data.instructor,
            facultyId: data.instructor_id || "",
            thumbnail: data.image,
            enrolledStudents: data.enrolled || 0,
            duration: data.duration,
            level: data.level,
            category: data.category,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            tags: data.tags || [],
            modules: []
          };
          
          setCourse(supabaseCourse);
        }
      } catch (err) {
        console.error("Error in course fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseFromSupabase();
  }, [courseId]);
  
  const isOwner = user?.role === "admin" || (user?.role === "faculty" && user.id === course?.facultyId);
  
  const handleEnroll = async () => {
    if (!user || !courseId) {
      toast.error("You need to be logged in to enroll");
      return;
    }
    
    try {
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
        
      if (existingEnrollment) {
        toast.info("You are already enrolled in this course");
        return;
      }
      
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0,
          completed_lessons: []
        });
        
      if (error) throw error;
      
      await supabase.rpc('increment_one', { row_id: courseId });
      
      if (course) {
        setCourse({
          ...course,
          enrolledStudents: course.enrolledStudents + 1
        });
      }
      
      toast.success(`You've enrolled in ${course?.title}`);
    } catch (err) {
      console.error("Error enrolling:", err);
      toast.error("Failed to enroll in course");
    }
  };
  
  const handleDelete = async () => {
    if (!courseId) return;
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);
        
      if (error) throw error;
      
      deleteCourse(courseId);
      toast.success("Course deleted successfully");
      navigate("/courses");
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course");
    }
  };
  
  if (loading) {
    return (
      <SidebarLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading course details...</span>
        </div>
      </SidebarLayout>
    );
  }
  
  if (error || !course) {
    return (
      <SidebarLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            className="mt-6"
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Button>
        </div>
      </SidebarLayout>
    );
  }
  
  return (
    <SidebarLayout>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/courses")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          
          {isOwner && (
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/courses/${course.id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-56 md:h-72 w-full bg-gradient-to-r from-elearn-primary to-elearn-secondary">
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h1>
              <div className="flex items-center text-white/90 text-sm mb-4">
                <User className="h-4 w-4 mr-1" />
                <span>Instructor: {course.facultyName}</span>
                <span className="mx-3">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/20 hover:bg-white/25 text-white border-none">
                  {course.category || "Computer Science"}
                </Badge>
                <Badge variant="outline" className="bg-white/20 hover:bg-white/25 text-white border-none">
                  {course.modules.length || 0} Modules
                </Badge>
                <Badge variant="outline" className="bg-white/20 hover:bg-white/25 text-white border-none">
                  {course.enrolledStudents} Students
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-elearn-primary mr-2 flex-shrink-0" />
                      <span>Fundamental concepts and principles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-elearn-primary mr-2 flex-shrink-0" />
                      <span>Practical skills through hands-on projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-elearn-primary mr-2 flex-shrink-0" />
                      <span>Industry best practices and methodologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-elearn-primary mr-2 flex-shrink-0" />
                      <span>Real-world problem solving techniques</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Basic understanding of the subject area</li>
                    <li>Access to a computer with internet connection</li>
                    <li>Commitment to complete course assignments</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-0">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {course.modules.length} modules • {course.modules.reduce((acc, module) => acc + module.content.length, 0)} lessons
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-elearn-primary" />
                          <span>{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pl-6">
                          {module.content.map((content) => (
                            <li key={content.id} className="border-b border-gray-100 dark:border-gray-700 pb-3">
                              <div className="flex items-start">
                                {content.type === "video" && (
                                  <Video className="h-4 w-4 mr-2 text-elearn-secondary flex-shrink-0 mt-1" />
                                )}
                                {content.type === "document" && (
                                  <FileText className="h-4 w-4 mr-2 text-elearn-secondary flex-shrink-0 mt-1" />
                                )}
                                {content.type === "quiz" && (
                                  <CheckCircle className="h-4 w-4 mr-2 text-elearn-secondary flex-shrink-0 mt-1" />
                                )}
                                {content.type === "assignment" && (
                                  <FileIcon className="h-4 w-4 mr-2 text-elearn-secondary flex-shrink-0 mt-1" />
                                )}
                                <div>
                                  <div className="font-medium">{content.title}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{content.description}</div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </TabsContent>
            
            <TabsContent value="instructor" className="mt-0">
              <Card className="p-6">
                <div className="flex items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://i.pravatar.cc/150?u=faculty" />
                    <AvatarFallback>{course.facultyName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{course.facultyName}</h2>
                    <p className="text-gray-500 dark:text-gray-400">Professor of Computer Science</p>
                    
                    <div className="mt-4 text-sm">
                      <div className="flex items-center mb-1">
                        <Book className="h-4 w-4 mr-2 text-elearn-primary" />
                        <span>{Math.floor(Math.random() * 10) + 1} Courses</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <User className="h-4 w-4 mr-2 text-elearn-primary" />
                        <span>{Math.floor(Math.random() * 1000) + 100} Students</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">About the Instructor</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Professor {course.facultyName} is an experienced educator with extensive knowledge in the field. 
                    With years of teaching experience and industry expertise, they bring real-world insights to 
                    their courses, helping students develop practical skills alongside theoretical knowledge.
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Student Reviews</h2>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-elearn-primary mr-2">4.8</div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      ({Math.floor(Math.random() * 100) + 20} reviews)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${review + 10}`} />
                          <AvatarFallback>S{review}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Student {review}</div>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                          {review * 2} days ago
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review === 1 && "This course exceeded my expectations. The instructor explains complex concepts clearly and the practical examples are very helpful."}
                        {review === 2 && "Great content and well-structured curriculum. I appreciate the hands-on approach and detailed explanations."}
                        {review === 3 && "Highly recommended for anyone wanting to learn this subject. The assignments are challenging but very educational."}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Course Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Course Syllabus
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Reference Materials
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" className="w-full justify-start">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Sample Lecture
                    </Button>
                  </li>
                </ul>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Enroll in this Course</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-elearn-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full course access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-elearn-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Assignments & quizzes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-elearn-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Certificate of completion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-elearn-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">24/7 support</span>
                  </li>
                </ul>
                
                {user?.role === "student" && (
                  <Button 
                    className="w-full bg-elearn-primary hover:bg-elearn-primary/90"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                )}
                
                {!user || (user.role !== "student" && user.role !== "faculty") && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Students can enroll in this course
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default CourseDetail;
