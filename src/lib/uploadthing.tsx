
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  endpoint: string;
  onClientUploadComplete?: (res: any[]) => void;
  onUploadError?: (error: Error) => void;
  [key: string]: any;
}

// Mock implementation of UploadButton
export const UploadButton: React.FC<UploadButtonProps> = ({ 
  endpoint,
  onClientUploadComplete,
  onUploadError,
  ...props
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      // Mock file upload - immediately return a fake URL
      const mockResults = [{
        url: URL.createObjectURL(files[0]),
        name: files[0].name,
        size: files[0].size,
        key: `${Date.now()}-${files[0].name}`
      }];
      
      if (onClientUploadComplete) {
        onClientUploadComplete(mockResults);
      }
    } catch (error) {
      if (onUploadError && error instanceof Error) {
        onUploadError(error);
      }
    }
  };
  
  return (
    <div className="flex gap-2 items-center">
      <Button
        type="button"
        variant="outline"
        className="flex gap-2 items-center"
        {...props}
      >
        <Upload size={16} />
        Upload file
        <input 
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
      <span className="text-sm text-muted-foreground">
        Upload a course thumbnail image
      </span>
    </div>
  );
};

export const UploadDropzone = UploadButton;
