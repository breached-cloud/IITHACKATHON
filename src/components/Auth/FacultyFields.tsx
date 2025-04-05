
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/authSchemas";

interface FacultyFieldsProps {
  form: UseFormReturn<SignUpFormValues>;
}

const FacultyFields: React.FC<FacultyFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your department" />
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
        name="subjectsTaught"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subjects Taught</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter the subjects you teach (comma separated)"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">
              Example: Database Systems, Web Development, Machine Learning
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FacultyFields;
