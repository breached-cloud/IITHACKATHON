
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "@/schemas/authSchemas";

interface AdminFieldsProps {
  form: UseFormReturn<SignUpFormValues>;
}

const AdminFields: React.FC<AdminFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="adminKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Admin Verification Key</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder="Enter admin verification key"
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
              This key is provided by the institution to verify admin status
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Designation</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your designation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="IT Administrator">IT Administrator</SelectItem>
                <SelectItem value="Department Head">Department Head</SelectItem>
                <SelectItem value="Academic Coordinator">Academic Coordinator</SelectItem>
                <SelectItem value="Exam Controller">Exam Controller</SelectItem>
                <SelectItem value="System Administrator">System Administrator</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdminFields;
