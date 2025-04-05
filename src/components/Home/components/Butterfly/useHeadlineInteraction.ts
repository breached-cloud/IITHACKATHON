
import { useState, useEffect, RefObject } from "react";

interface UseHeadlineInteractionProps {
  butterflyRef: RefObject<HTMLDivElement>;
  onHover: (isHovering: boolean) => void;
  visible: boolean;
}

const useHeadlineInteraction = ({ butterflyRef, onHover, visible }: UseHeadlineInteractionProps) => {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (butterflyRef.current && visible) {
        const butterfly = butterflyRef.current;
        const butterflyRect = butterfly.getBoundingClientRect();
        
        // Find the EduNexus headline specifically
        const headlineElement = document.querySelector('h1.hero-text span');
        
        if (headlineElement) {
          const headlineRect = headlineElement.getBoundingClientRect();
          
          // Check if butterfly overlaps with headline
          const isHoveringHeadline = !(
            butterflyRect.right < headlineRect.left || 
            butterflyRect.left > headlineRect.right || 
            butterflyRect.bottom < headlineRect.top || 
            butterflyRect.top > headlineRect.bottom
          );
          
          if (isHoveringHeadline && hoveredElement !== headlineElement) {
            setHoveredElement(headlineElement);
            onHover(true);
            
            // Make butterfly disappear after touching the headline
            setTimeout(() => {
              // This will be handled in the parent component
              onHover(false);
            }, 1100); // Match the color change duration (1 second) + a little extra
          }
        }
      }
    }, 100);
    
    return () => {
      clearInterval(checkInterval);
    };
  }, [onHover, hoveredElement, visible, butterflyRef]);
  
  return {
    hoveredElement
  };
};

export default useHeadlineInteraction;
