import React, { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { 
  FileText, Upload, CheckCircle, Clock, XCircle, Calendar, 
  Download, ChevronRight, Plus, FilePen, AlignLeft, FileQuestion, 
  Send, Users, Star, Loader, FileUp 
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  deadline: Date;
  totalMarks: number;
  status: "pending" | "submitted" | "graded" | "late" | "draft";
  submittedAt?: Date;
  score?: number;
  feedback?: string;
  files?: string[];
  createdBy: string;
}

interface AssignmentSubmission {
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: Date;
  files: string[];
  status: "submitted" | "graded" | "late";
  score?: number;
  feedback?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Database Design Project",
    description: "Create an ER diagram and implement a normalized database schema for a library management system.",
    course: "CS301 - Database Systems",
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
    totalMarks: 100,
    status: "pending",
    createdBy: "Jane Faculty"
  },
  {
    id: "2",
    title: "Web Application Development",
    description: "Build a responsive web application using React for a student management system.",
    course: "CS302 - Web Development",
    deadline: new Date(new Date().setDate(new Date().getDate() - 2)),
    totalMarks: 100,
    status: "late",
    createdBy: "Jane Faculty"
  },
  {
    id: "3",
    title: "Algorithm Analysis",
    description: "Analyze the time and space complexity of different sorting algorithms.",
    course: "CS303 - Data Structures & Algorithms",
    deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
    totalMarks: 50,
    status: "pending",
    createdBy: "Jane Faculty"
  },
  {
    id: "4",
    title: "JavaScript Frameworks Comparison",
    description: "Compare and contrast three JavaScript frameworks of your choice.",
    course: "CS302 - Web Development",
    deadline: new Date(new Date().setDate(new Date().getDate() - 5)),
    totalMarks: 50,
    status: "submitted",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 6)),
    createdBy: "Jane Faculty"
  },
  {
    id: "5",
    title: "Database Indexing Research",
    description: "Research and write a report on database indexing techniques.",
    course: "CS301 - Database Systems",
    deadline: new Date(new Date().setDate(new Date().getDate() - 15)),
    totalMarks: 80,
    status: "graded",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 16)),
    score: 75,
    feedback: "Excellent work on the comparison of different indexing techniques. Your analysis of B-tree vs. hash indexes was particularly insightful.",
    createdBy: "Jane Faculty"
  }
];

const mockSubmissions: AssignmentSubmission[] = [
  {
    assignmentId: "1",
    studentId: "s1",
    studentName: "John Student",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    files: ["ERDiagram.pdf", "Schema.sql"],
    status: "submitted"
  },
  {
    assignmentId: "4",
    studentId: "s2",
    studentName: "Alice Smith",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    files: ["Frameworks_Comparison.pdf"],
    status: "graded",
    score: 45,
    feedback: "Good comparison but missing depth in the performance analysis section."
  },
  {
    assignmentId: "5",
    studentId: "s3",
    studentName: "Bob Johnson",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 16)),
    files: ["Database_Indexing.pdf", "performance_tests.xlsx"],
    status: "graded",
    score: 78,
    feedback: "Great work! Comprehensive analysis and well-structured report."
  }
];

const Assignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isViewSubmissionDialogOpen, setIsViewSubmissionDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    course: "",
    deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
    totalMarks: 100,
    status: "draft",
    createdBy: user?.name || ""
  });
  const [submitForm, setSubmitForm] = useState({
    files: [""] as string[],
    notes: ""
  });
  const [gradeForm, setGradeForm] = useState({
    score: "0",
    feedback: ""
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="flex items-center gap-1"><Clock size={12} />Pending</Badge>;
      case "submitted":
        return <Badge className="bg-yellow-500 flex items-center gap-1"><CheckCircle size={12} />Submitted</Badge>;
      case "graded":
        return <Badge className="bg-green-600 flex items-center gap-1"><Star size={12} />Graded</Badge>;
      case "late":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle size={12} />Late</Badge>;
      case "draft":
        return <Badge variant="secondary" className="flex items-center gap-1"><FilePen size={12} />Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      course: newAssignment.course,
      deadline: newAssignment.deadline || new Date(),
      totalMarks: newAssignment.totalMarks || 100,
      status: "pending",
      createdBy: user?.name || "",
    };
    
    setAssignments([...assignments, assignment]);
    setIsCreateDialogOpen(false);
    setNewAssignment({
      title: "",
      description: "",
      course: "",
      deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
      totalMarks: 100,
      status: "draft",
      createdBy: user?.name || ""
    });
    
    toast({
      title: "Assignment Created",
      description: "Your assignment has been created successfully"
    });
  };
  
  const handleSubmitAssignment = () => {
    if (!selectedAssignment) return;
    
    if (submitForm.files.some(file => !file)) {
      toast({
        title: "Missing Files",
        description: "Please upload all required files",
        variant: "destructive"
      });
      return;
    }
    
    // Update assignment status
    const updatedAssignments = assignments.map(a => {
      if (a.id === selectedAssignment.id) {
        return {
          ...a,
          status: "submitted" as const,
          submittedAt: new Date()
        };
      }
      return a;
    });
    
    // Create submission
    const newSubmission: AssignmentSubmission = {
      assignmentId: selectedAssignment.id,
      studentId: user?.id || "",
      studentName: user?.name || "",
      submittedAt: new Date(),
      files: submitForm.files,
      status: "submitted"
    };
    
    setAssignments(updatedAssignments);
    setSubmissions([...submissions, newSubmission]);
    setIsSubmitDialogOpen(false);
    setSubmitForm({
      files: [""],
      notes: ""
    });
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully"
    });
  };
  
  const handleGradeSubmission = () => {
    if (!selectedSubmission) return;
    
    if (!gradeForm.score || parseInt(gradeForm.score) < 0) {
      toast({
        title: "Invalid Score",
        description: "Please enter a valid score",
        variant: "destructive"
      });
      return;
    }
    
    // Update submission with grade
    const updatedSubmissions = submissions.map(s => {
      if (s.assignmentId === selectedSubmission.assignmentId && s.studentId === selectedSubmission.studentId) {
        return {
          ...s,
          status: "graded" as const,
          score: parseInt(gradeForm.score),
          feedback: gradeForm.feedback
        };
      }
      return s;
    });
    
    // Also update assignment if it belongs to the current user
    const updatedAssignments = assignments.map(a => {
      if (a.id === selectedSubmission.assignmentId && user?.id === selectedSubmission.studentId) {
        return {
          ...a,
          status: "graded" as const,
          score: parseInt(gradeForm.score),
          feedback: gradeForm.feedback
        };
      }
      return a;
    });
    
    setSubmissions(updatedSubmissions);
    setAssignments(updatedAssignments);
    setIsGradeDialogOpen(false);
    setGradeForm({
      score: "0",
      feedback: ""
    });
    
    toast({
      title: "Submission Graded",
      description: "The submission has been graded successfully"
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const filteredAssignments = user?.role === "admin" 
    ? assignments 
    : user?.role === "student" 
      ? assignments 
      : assignments.filter(a => a.createdBy === user?.name);
  
  const filteredSubmissions = user?.role === "admin" 
    ? submissions 
    : user?.role === "student" 
      ? submissions.filter(s => s.studentId === user?.id) 
      : submissions;

  return (
    <PageLayout title="Assignments" requiredRoles={["student", "faculty", "admin"]}>
      <Tabs defaultValue="assignments">
        <TabsList className="mb-6">
          <TabsTrigger value="assignments">
            <FileText className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
          {user?.role === "student" && (
            <TabsTrigger value="submitted">
              <CheckCircle className="mr-2 h-4 w-4" />
              My Submissions
            </TabsTrigger>
          )}
          {(user?.role === "faculty" || user?.role === "admin") && (
            <TabsTrigger value="submissions">
              <Users className="mr-2 h-4 w-4" />
              Student Submissions
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="assignments">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {user?.role === "student" ? "My Assignments" : "Manage Assignments"}
            </h2>
            {(user?.role === "faculty" || user?.role === "admin") && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Assignment
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{assignment.title}</CardTitle>
                    {getStatusBadge(assignment.status)}
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Due: {formatDate(assignment.deadline)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Course</p>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-gray-500 line-clamp-3">{assignment.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Marks</p>
                      <p className="text-sm text-gray-500">{assignment.totalMarks}</p>
                    </div>
                    
                    {assignment.status === "graded" && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Score</p>
                          <p className="text-sm font-medium">{assignment.score} / {assignment.totalMarks}</p>
                        </div>
                        <Progress 
                          value={(assignment.score! / assignment.totalMarks) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {user?.role === "student" && (
                      <div className="pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="gap-1"
                          onClick={() => {
                            toast({
                              title: "Download Started",
                              description: "The assignment details are being downloaded"
                            });
                          }}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        
                        {(assignment.status === "pending" || assignment.status === "late") && (
                          <Button 
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setIsSubmitDialogOpen(true);
                            }}
                          >
                            <Upload className="h-4 w-4" />
                            Submit
                          </Button>
                        )}
                        
                        {assignment.status === "submitted" && (
                          <Button 
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4" />
                            Submitted
                          </Button>
                        )}
                        
                        {assignment.status === "graded" && (
                          <Button 
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              toast({
                                title: "Feedback",
                                description: assignment.feedback || "No detailed feedback provided."
                              });
                            }}
                          >
                            <AlignLeft className="h-4 w-4" />
                            View Feedback
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {(user?.role === "faculty" || user?.role === "admin") && (
                      <div className="pt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="gap-1"
                          onClick={() => {
                            toast({
                              title: "Viewing Submissions",
                              description: "Navigate to the Submissions tab to view all submissions for this assignment"
                            });
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                          View Submissions
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredAssignments.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                <FileQuestion className="h-12 w-12 mb-4 opacity-30" />
                <p className="text-lg mb-2">No assignments found</p>
                <p className="text-sm">
                  {user?.role === "student" 
                    ? "You don't have any assignments yet." 
                    : "You haven't created any assignments yet."}
                </p>
                {(user?.role === "faculty" || user?.role === "admin") && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="submitted">
          <h2 className="text-2xl font-bold mb-6">My Submissions</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>View all your assignment submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions
                    .filter(s => s.studentId === user?.id)
                    .map((submission) => {
                      const assignment = assignments.find(a => a.id === submission.assignmentId);
                      return (
                        <TableRow key={`${submission.assignmentId}-${submission.studentId}`}>
                          <TableCell className="font-medium">{assignment?.title || "Unknown Assignment"}</TableCell>
                          <TableCell>{assignment?.course || "N/A"}</TableCell>
                          <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                          <TableCell>{getStatusBadge(submission.status)}</TableCell>
                          <TableCell>
                            {submission.score !== undefined 
                              ? `${submission.score} / ${assignment?.totalMarks || 100}` 
                              : "Pending"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setIsViewSubmissionDialogOpen(true);
                              }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              
              {submissions.filter(s => s.studentId === user?.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>You haven't submitted any assignments yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submissions">
          <h2 className="text-2xl font-bold mb-6">Student Submissions</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Review Submissions</CardTitle>
              <CardDescription>Manage and grade student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => {
                    const assignment = assignments.find(a => a.id === submission.assignmentId);
                    return (
                      <TableRow key={`${submission.assignmentId}-${submission.studentId}`}>
                        <TableCell className="font-medium">{submission.studentName}</TableCell>
                        <TableCell>{assignment?.title || "Unknown Assignment"}</TableCell>
                        <TableCell>{assignment?.course || "N/A"}</TableCell>
                        <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          {submission.score !== undefined 
                            ? `${submission.score} / ${assignment?.totalMarks || 100}` 
                            : "Not Graded"}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setIsViewSubmissionDialogOpen(true);
                            }}
                          >
                            View
                          </Button>
                          {submission.status !== "graded" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setGradeForm({
                                  score: submission.score?.toString() || "0",
                                  feedback: submission.feedback || ""
                                });
                                setIsGradeDialogOpen(true);
                              }}
                            >
                              Grade
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Loader className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No submissions to review yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input 
                  id="title" 
                  value={newAssignment.title} 
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Enter assignment title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input 
                  id="course" 
                  value={newAssignment.course} 
                  onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  placeholder="Enter course name/code"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="datetime-local" 
                    value={newAssignment.deadline?.toISOString().slice(0, 16)} 
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : new Date();
                      setNewAssignment({...newAssignment, deadline: date});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input 
                    id="totalMarks" 
                    type="number" 
                    value={newAssignment.totalMarks} 
                    onChange={(e) => setNewAssignment({...newAssignment, totalMarks: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Assignment Description</Label>
                <Textarea 
                  id="description" 
                  value={newAssignment.description} 
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Enter detailed instructions for the assignment"
                  rows={5}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateAssignment}>
              Create Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedAssignment && (
              <div className="mb-4">
                <p className="font-medium">{selectedAssignment.title}</p>
                <p className="text-sm text-gray-500">{selectedAssignment.course}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {formatDate(selectedAssignment.deadline)}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Files</Label>
                {submitForm.files.map((file, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={file} 
                      onChange={(e) => {
                        const updatedFiles = [...submitForm.files];
                        updatedFiles[index] = e.target.value;
                        setSubmitForm({...submitForm, files: updatedFiles});
                      }}
                      placeholder="Enter filename (e.g. assignment.pdf)"
                    />
                    {index === submitForm.files.length - 1 ? (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSubmitForm({...submitForm, files: [...submitForm.files, '']})}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          const updatedFiles = submitForm.files.filter((_, i) => i !== index);
                          setSubmitForm({...submitForm, files: updatedFiles});
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-500">In a real application, this would allow file uploads</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Submission Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  value={submitForm.notes} 
                  onChange={(e) => setSubmitForm({...submitForm, notes: e.target.value})}
                  placeholder="Any notes for your instructor"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitAssignment}>
              <FileUp className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedSubmission && (
              <div className="mb-4">
                <p className="font-medium">
                  Student: {selectedSubmission.studentName}
                </p>
                <p className="text-sm text-gray-500">
                  Assignment: {assignments.find(a => a.id === selectedSubmission.assignmentId)?.title}
                </p>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Submitted: {formatDate(selectedSubmission.submittedAt)}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Submitted Files:</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside">
                    {selectedSubmission.files.map((file, index) => (
                      <li key={index}>
                        <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                          {file}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="score">Score</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="score" 
                    type="number" 
                    value={gradeForm.score} 
                    onChange={(e) => setGradeForm({...gradeForm, score: e.target.value})}
                    min="0"
                    max={selectedAssignment?.totalMarks.toString() || "100"}
                  />
                  <span className="text-gray-500">/ {selectedAssignment?.totalMarks || 100}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea 
                  id="feedback" 
                  value={gradeForm.feedback} 
                  onChange={(e) => setGradeForm({...gradeForm, feedback: e.target.value})}
                  placeholder="Provide feedback on the submission"
                  rows={4}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleGradeSubmission}>
              <Star className="mr-2 h-4 w-4" />
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewSubmissionDialogOpen} onOpenChange={setIsViewSubmissionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedSubmission && (
              <>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium">Student</h3>
                    <p className="text-sm">{selectedSubmission.studentName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Assignment</h3>
                    <p className="text-sm">{assignments.find(a => a.id === selectedSubmission.assignmentId)?.title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Course</h3>
                    <p className="text-sm">{assignments.find(a => a.id === selectedSubmission.assignmentId)?.course}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Submission Date</h3>
                    <p className="text-sm">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <div>{getStatusBadge(selectedSubmission.status)}</div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Files</h3>
                    <ul className="text-sm list-disc list-inside mt-1">
                      {selectedSubmission.files.map((file, index) => (
                        <li key={index}>
                          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                            {file}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedSubmission.score !== undefined && (
                    <div>
                      <h3 className="text-sm font-medium">Score</h3>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(selectedSubmission.score / (assignments.find(a => a.id === selectedSubmission.assignmentId)?.totalMarks || 100)) * 100}
                          className="h-2 flex-grow"
                        />
                        <span className="text-sm">
                          {selectedSubmission.score} / {assignments.find(a => a.id === selectedSubmission.assignmentId)?.totalMarks || 100}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {selectedSubmission.feedback && (
                    <div>
                      <h3 className="text-sm font-medium">Feedback</h3>
                      <p className="text-sm mt-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                        {selectedSubmission.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsViewSubmissionDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Assignments;
