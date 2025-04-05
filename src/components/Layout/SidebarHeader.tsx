
import React from "react";
import { X } from "lucide-react";
import Logo from "./Logo";

interface SidebarHeaderProps {
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between px-4 py-6">
      <div className="flex items-center">
        <Logo />
        <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">EduNexus</h1>
      </div>
      <button
        onClick={toggleSidebar}
        className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
