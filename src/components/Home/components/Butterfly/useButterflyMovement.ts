
import { useState, useEffect } from "react";

export interface Position {
  x: number;
  y: number;
}

interface UseButterflyMovementProps {
  visible: boolean;
}

const useButterflyMovement = ({ visible }: UseButterflyMovementProps) => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 0, y: 0 });
  const [isFluttering, setIsFluttering] = useState(false);
  
  // Initialize target position
  useEffect(() => {
    setTargetPosition({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight * 0.6) + 100,
    });
  }, []);
  
  // Movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFluttering(prev => !prev);
      
      if (visible) {
        // Update position - move towards target with some randomness
        setPosition(prev => {
          const dx = (targetPosition.x - prev.x) * 0.03;
          const dy = (targetPosition.y - prev.y) * 0.03;
          
          // Add some random movement
          const randomX = (Math.random() - 0.5) * 5;
          const randomY = (Math.random() - 0.5) * 5;
          
          return {
            x: prev.x + dx + randomX,
            y: prev.y + dy + randomY
          };
        });
      }
      
      // Occasionally change target position
      if (Math.random() < 0.005) {
        setTargetPosition({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight * 0.6) + 100,
        });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [targetPosition, visible]);
  
  // Determine the direction the butterfly is facing
  const isMovingRight = targetPosition.x > position.x;
  
  return {
    position,
    targetPosition,
    isFluttering,
    isMovingRight
  };
};

export default useButterflyMovement;
