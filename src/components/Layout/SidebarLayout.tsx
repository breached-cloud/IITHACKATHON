
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SidebarHeader from "./SidebarHeader";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import Header from "./Header";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  if (!user) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-sm transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <SidebarHeader toggleSidebar={toggleSidebar} />

          {/* Navigation */}
          <Navigation 
            currentPath={currentPath} 
            navigateTo={navigateTo} 
          />

          {/* User profile */}
          <UserProfile user={user} logout={logout} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} user={user} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
