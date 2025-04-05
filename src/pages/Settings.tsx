
import React, { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Lock, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated."
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Your password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to change the password
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully."
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Admin-specific settings
  const isAdmin = user?.role === 'admin';
  const [userRoleManagement, setUserRoleManagement] = useState({
    studentsCanMessage: true,
    facultyCanCreateCourses: true,
    publicRegistration: false
  });

  const handleSystemSettingChange = (setting: string, value: boolean) => {
    setUserRoleManagement(prev => ({ ...prev, [setting]: value }));
    
    toast({
      title: "System setting updated",
      description: `The ${setting} setting has been ${value ? 'enabled' : 'disabled'}.`
    });
  };

  return (
    <PageLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="system">
                <Shield className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue={user?.email} disabled />
                    </div>
                    
                    {user?.role === 'student' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="rollNumber">Roll Number</Label>
                          <Input id="rollNumber" defaultValue={user.rollNumber} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <Input id="course" defaultValue={user.course} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Input id="semester" defaultValue={user.semester} />
                        </div>
                      </>
                    )}
                    
                    {user?.role === 'faculty' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input id="department" defaultValue={user.department} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subjects">Subjects Taught</Label>
                          <Input 
                            id="subjects" 
                            defaultValue={user.subjectsTaught ? user.subjectsTaught.join(", ") : ""} 
                          />
                        </div>
                      </>
                    )}
                    
                    {user?.role === 'admin' && (
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input id="designation" defaultValue={user.designation} />
                      </div>
                    )}
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="theme">Theme Preference</Label>
                      <Select defaultValue="system">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => {
                      toast({
                        title: "Profile updated",
                        description: "Your profile information has been saved."
                      });
                    }}
                  >
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications about important updates</p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  {user?.role === 'student' && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Assignment Reminders</h4>
                          <p className="text-sm text-muted-foreground">Get reminded before assignment deadlines</p>
                        </div>
                        <Switch defaultChecked disabled={!notificationsEnabled} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Quiz Notifications</h4>
                          <p className="text-sm text-muted-foreground">Be notified about new quizzes</p>
                        </div>
                        <Switch defaultChecked disabled={!notificationsEnabled} />
                      </div>
                    </>
                  )}
                  
                  {(user?.role === 'faculty' || user?.role === 'admin') && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Student Submissions</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications when students submit assignments</p>
                      </div>
                      <Switch defaultChecked disabled={!notificationsEnabled} />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Messages</h4>
                      <p className="text-sm text-muted-foreground">Be notified about new messages</p>
                    </div>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>
                  
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="current-password" 
                          type={showPassword ? "text" : "password"} 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Students Can Message Each Other</h4>
                        <p className="text-sm text-muted-foreground">Allow students to send direct messages to other students</p>
                      </div>
                      <Switch 
                        checked={userRoleManagement.studentsCanMessage}
                        onCheckedChange={(value) => handleSystemSettingChange("studentsCanMessage", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Faculty Can Create Courses</h4>
                        <p className="text-sm text-muted-foreground">Allow faculty members to create new courses without admin approval</p>
                      </div>
                      <Switch 
                        checked={userRoleManagement.facultyCanCreateCourses}
                        onCheckedChange={(value) => handleSystemSettingChange("facultyCanCreateCourses", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Public Registration</h4>
                        <p className="text-sm text-muted-foreground">Allow users to register without invitation</p>
                      </div>
                      <Switch 
                        checked={userRoleManagement.publicRegistration}
                        onCheckedChange={(value) => handleSystemSettingChange("publicRegistration", value)}
                      />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button variant="destructive" onClick={() => {
                        toast({
                          title: "Action not available",
                          description: "This feature is not available in the demo version.",
                          variant: "destructive"
                        });
                      }}>
                        Reset All Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
