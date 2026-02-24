import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">


      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Top bar always visible */}
        <TopNavbar />

        {/* Page content changes */}
        <div className="flex-1 p-8">

          <Outlet />
        </div>

      </div>
    </div>
  );
}
