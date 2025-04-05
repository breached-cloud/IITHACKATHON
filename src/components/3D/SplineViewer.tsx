
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ThreeJsViewer from './ThreeJsViewer';

interface SplineViewerProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}

// This component no longer uses Spline due to reliability issues
// Instead, it uses ThreeJsViewer as a reliable fallback
const SplineViewer: React.FC<SplineViewerProps> = ({ 
  className = '',
  fallback,
  onError,
  scene = '' // Kept for API compatibility
}) => {
  const [hasError, setHasError] = useState(false);
  
  // Call onError to notify parent components
  React.useEffect(() => {
    if (onError) {
      // Inform parent that Spline is disabled
      onError();
    }
  }, [onError]);

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Custom fallback UI when there's an error
  const errorFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center p-4">
        <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300">3D model could not be loaded</p>
      </div>
    </div>
  );

  // Fallback to ThreeJs viewer which is more reliable
  return (
    <div className={`w-full h-full ${className}`}>
      {hasError ? 
        (fallback || errorFallback) : 
        (fallback || (
          <ThreeJsViewer
            type="abstract"
            color="#3b82f6" 
            className="w-full h-full"
            interactive={false}
            onError={handleError}
          />
        ))
      }
    </div>
  );
};

export default SplineViewer;
