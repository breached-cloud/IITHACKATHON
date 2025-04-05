
import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";
import { User as UserType } from "@/types/auth";

interface HeaderProps {
  toggleSidebar: () => void;
  user: UserType;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
          >
            <Menu size={24} />
          </button>

          {/* Header right */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center overflow-hidden lg:hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User size={16} className="text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
