
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/authSchemas";

interface StudentFieldsProps {
  form: UseFormReturn<SignUpFormValues>;
}

const StudentFields: React.FC<StudentFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="rollNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Roll Number</FormLabel>
            <FormControl>
              <Input placeholder="CS2023001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="course"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="semester"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Semester</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your semester" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1st">1st Semester</SelectItem>
                <SelectItem value="2nd">2nd Semester</SelectItem>
                <SelectItem value="3rd">3rd Semester</SelectItem>
                <SelectItem value="4th">4th Semester</SelectItem>
                <SelectItem value="5th">5th Semester</SelectItem>
                <SelectItem value="6th">6th Semester</SelectItem>
                <SelectItem value="7th">7th Semester</SelectItem>
                <SelectItem value="8th">8th Semester</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StudentFields;
