
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/auth";
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, User, 
  Calendar, FileText, MessageSquare, LogOut,
  Bell, Settings, BookOpen, FileQuestion 
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  requiredRoles?: UserRole[];
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, icon, label, collapsed, requiredRoles = ["student", "faculty", "admin"] 
}) => {
  const { hasPermission } = useAuth();
  const location = useLocation();
  const isActive = location.pathname === to;

  if (!hasPermission(requiredRoles)) return null;

  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
          collapsed && "justify-center px-2"
        )
      }
    >
      <div className="w-5 h-5 flex-shrink-0">{icon}</div>
      {!collapsed && <span className="font-medium">{label}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div 
      className={cn(
        "flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="font-bold text-lg">EduNexus</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-6 w-6 m-2 text-gray-500" />
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 ${collapsed ? 'hidden' : ''}`}></div>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-medium truncate max-w-[150px]">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-grow px-3 py-4">
        <div className="space-y-1">
          <SidebarLink 
            to="/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            collapsed={collapsed} 
          />
          <SidebarLink 
            to="/profile" 
            icon={<User size={18} />} 
            label="Profile" 
            collapsed={collapsed} 
          />
          <SidebarLink 
            to="/calendar" 
            icon={<Calendar size={18} />} 
            label="Calendar" 
            collapsed={collapsed} 
          />
          <SidebarLink 
            to="/assignments" 
            icon={<FileText size={18} />} 
            label="Assignments" 
            collapsed={collapsed} 
            requiredRoles={["student", "faculty"]}
          />
          <SidebarLink 
            to="/messages" 
            icon={<MessageSquare size={18} />} 
            label="Messages" 
            collapsed={collapsed} 
          />
          <SidebarLink 
            to="/courses" 
            icon={<BookOpen size={18} />} 
            label="Courses" 
            collapsed={collapsed} 
          />
          <SidebarLink 
            to="/quiz" 
            icon={<FileQuestion size={18} />} 
            label="Quizzes" 
            collapsed={collapsed} 
          />
          {user.role === "admin" && (
            <SidebarLink 
              to="/users" 
              icon={<User size={18} />} 
              label="Users" 
              collapsed={collapsed} 
              requiredRoles={["admin"]}
            />
          )}
          {(user.role === "admin" || user.role === "faculty") && (
            <>
              <SidebarLink 
                to="/analytics" 
                icon={<LayoutDashboard size={18} />} 
                label="Analytics" 
                collapsed={collapsed} 
                requiredRoles={["admin", "faculty"]}
              />
              <SidebarLink 
                to="/create-course" 
                icon={<BookOpen size={18} />} 
                label="Create Course" 
                collapsed={collapsed} 
                requiredRoles={["admin", "faculty"]}
              />
            </>
          )}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-3">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
            collapsed && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut size={18} className={collapsed ? "" : "mr-2"} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
