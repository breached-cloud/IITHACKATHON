
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Home/Header";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import ThreeDModelsSection from "@/components/Home/3DModelsSection";
import PersonalizedLearningSection from "@/components/Home/PersonalizedLearningSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTASection from "@/components/Home/CTASection";
import Footer from "@/components/Home/Footer";

const Index: React.FC = () => {
  const [hasShownErrorToast, setHasShownErrorToast] = useState(false);

  // Enhanced error handler
  useEffect(() => {
    // Track 3D rendering errors
    let errorCount = 0;
    
    // Add global error handler to catch any uncaught errors
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      
      // Only show the error toast once per session
      if (!hasShownErrorToast && 
          event.error && 
          (event.error.message?.includes("Spline") || 
           event.error.message?.includes("buffer not reached") ||
           event.error.message?.includes("WebGL"))) {
        
        errorCount++;
        
        // Only show toast for persistent errors
        if (errorCount > 2) {
          toast.warning("Some 3D elements might not display correctly. We're showing alternative content instead.", {
            duration: 5000,
            position: "bottom-center"
          });
          setHasShownErrorToast(true);
        }
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [hasShownErrorToast]);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ThreeDModelsSection />
      <PersonalizedLearningSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
