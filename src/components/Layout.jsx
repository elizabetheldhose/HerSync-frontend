import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Menu } from "lucide-react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Top Bar with Hamburger */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="font-medium">HerSync</h2>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <TopNavbar />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>

      </div>
    </div>
  );
}