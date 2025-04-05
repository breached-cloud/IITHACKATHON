
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/auth";
import PageLayout from "@/components/Layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Upload, User as UserIcon } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>(user || {});
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the data via an API call
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
    setEditing(false);
  };

  return (
    <PageLayout title="My Profile">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="w-full md:w-1/3">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Your profile image</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="text-4xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {editing && (
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                      >
                        <Upload className="h-8 w-8 text-white" />
                        <input 
                          type="file" 
                          id="avatar-upload" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-xl">{user.name}</h3>
                  <p className="text-gray-500 capitalize">{user.role}</p>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                  </div>
                  <Button 
                    variant={editing ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setEditing(!editing)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {editing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          disabled={!editing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          disabled={!editing} 
                        />
                      </div>
                    </div>

                    {user.role === "student" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rollNumber">Roll Number</Label>
                          <Input 
                            id="rollNumber" 
                            name="rollNumber" 
                            value={formData.rollNumber} 
                            onChange={handleInputChange} 
                            disabled={!editing} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <Input 
                            id="course" 
                            name="course" 
                            value={formData.course} 
                            onChange={handleInputChange} 
                            disabled={!editing} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Input 
                            id="semester" 
                            name="semester" 
                            value={formData.semester} 
                            onChange={handleInputChange} 
                            disabled={!editing} 
                          />
                        </div>
                      </div>
                    )}

                    {user.role === "faculty" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleInputChange} 
                            disabled={!editing} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subjectsTaught">Subjects Taught</Label>
                          <Input 
                            id="subjectsTaught" 
                            name="subjectsTaught" 
                            value={formData.subjectsTaught?.join(", ")} 
                            onChange={(e) => {
                              setFormData(prev => ({ 
                                ...prev, 
                                subjectsTaught: e.target.value.split(", ") 
                              }));
                            }} 
                            disabled={!editing} 
                          />
                        </div>
                      </div>
                    )}

                    {user.role === "admin" && (
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input 
                          id="designation" 
                          name="designation" 
                          value={formData.designation} 
                          onChange={handleInputChange} 
                          disabled={!editing} 
                        />
                      </div>
                    )}
                    
                    {editing && (
                      <Button type="submit" className="mt-4">Save Changes</Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Settings</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-4">
                    {/* Add notification preferences here */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
