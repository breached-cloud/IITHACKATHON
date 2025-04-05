
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThreeJsViewer from '@/components/3D/ThreeJsViewer';
import { ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  splineScene?: string; // Kept for API compatibility but no longer used
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  const [showModel, setShowModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getCardType = () => {
    if (buttonText.includes("Resume")) return { type: "course", color: "#3b82f6" };
    if (buttonText.includes("Deadlines")) return { type: "deadline", color: "#f97316" };
    if (buttonText.includes("Messages")) return { type: "message", color: "#8b5cf6" };
    return { type: "abstract", color: "#3b82f6" };
  };

  const { type, color } = getCardType();

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isHovered ? 'shadow-lg' : 'shadow'}`}
      onMouseEnter={() => {
        setShowModel(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setShowModel(false);
        setIsHovered(false);
      }}
      style={{
        borderColor: isHovered ? color + '30' : 'transparent',
        boxShadow: isHovered ? `0 10px 25px -5px ${color}20, 0 8px 10px -6px ${color}10` : ''
      }}
    >
      {showModel && (
        <div className="absolute right-0 top-0 w-24 h-24 opacity-80 pointer-events-none transition-all duration-300">
          <ThreeJsViewer 
            type={type as 'abstract' | 'biology' | 'physics' | 'programming'}
            color={color}
            className="w-full h-full"
            interactive={false}
          />
        </div>
      )}
      
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-10"
        style={{
          background: isHovered ? 
            `radial-gradient(circle at top right, ${color}15, transparent 70%)` :
            ''
        }}
      />
      
      <CardContent className={`p-6 relative z-10 ${isHovered ? 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm' : ''}`}>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <Button 
          className={`w-full group ${
            buttonText.includes("Resume") ? 
              "bg-elearn-primary hover:bg-elearn-primary/90" : 
              "border border-gray-200 dark:border-gray-700"
          }`}
          variant={buttonText.includes("Resume") ? "default" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
          <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isHovered ? 'group-hover:translate-x-1' : ''}`} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
