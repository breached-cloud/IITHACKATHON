
import React from "react";
import { motion } from "framer-motion";

interface FlyingButterflyProps {
  onHover: (isHovering: boolean) => void;
}

const FlyingButterfly: React.FC<FlyingButterflyProps> = ({ onHover }) => {
  const path = [
    { x: "0%", y: "20%" },
    { x: "30%", y: "10%" },
    { x: "60%", y: "30%" },
    { x: "40%", y: "50%" },
    { x: "70%", y: "40%" },
    { x: "90%", y: "20%" },
    { x: "70%", y: "70%" },
    { x: "30%", y: "60%" },
    { x: "50%", y: "80%" },
    { x: "10%", y: "50%" },
    { x: "0%", y: "20%" }
  ];
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
      initial="initial"
      animate="animate"
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
    >
      <motion.div
        className="absolute butterfly-animation"
        style={{ left: 0, top: 0 }}
        variants={{
          initial: {
            x: path[0].x,
            y: path[0].y,
          },
          animate: {
            x: path.map(p => p.x),
            y: path.map(p => p.y),
            transition: {
              x: { 
                duration: 30, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] 
              },
              y: { 
                duration: 30, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] 
              }
            }
          }
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M12 2L9 9H15L12 2Z" fill="#60A5FA" />
            <path d="M12 2L15 9H9L12 2Z" fill="#60A5FA" fillOpacity="0.7" />
            <path d="M9 9L4 16H12L9 9Z" fill="#93C5FD" />
            <path d="M15 9L20 16H12L15 9Z" fill="#93C5FD" />
            <path d="M12 16L9 21H15L12 16Z" fill="#BFDBFE" />
            <circle cx="12" cy="16" r="1" fill="#1E3A8A" />
            <circle cx="12" cy="9" r="1" fill="#1E3A8A" />
            <line x1="12" y1="9" x2="12" y2="16" stroke="#1E3A8A" strokeWidth="0.5" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default FlyingButterfly;
