
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className 
}) => {
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="dashboard-stat-label mb-1">{title}</p>
            <p className="dashboard-stat">{value}</p>
            {change && (
              <p className={`text-xs mt-1 flex items-center ${
                change.isPositive ? 'text-elearn-success' : 'text-elearn-error'
              }`}>
                <span className="mr-1">
                  {change.isPositive ? '↑' : '↓'}
                </span>
                {change.value}
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-elearn-primary/10 text-elearn-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
