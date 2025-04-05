
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { NavItem, navigationItems } from "./navigation";

interface NavigationProps {
  currentPath: string;
  navigateTo: (path: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath, navigateTo }) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const filteredNavigation = navigationItems.filter(item => item.roles.includes(user.role));
  
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
      {filteredNavigation.map((item) => (
        <button
          key={item.name}
          onClick={() => navigateTo(item.path)}
          className={`nav-link w-full ${currentPath === item.path ? "active" : ""}`}
        >
          <item.icon size={20} />
          <span>{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
