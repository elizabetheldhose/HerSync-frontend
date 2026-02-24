import Sidebar from "../Sidebar";
import TopNavbar from "../TopNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-blush text-warmText">

      <Sidebar />

      <main className="flex-1 p-10">
        <TopNavbar />
        <Outlet />
      </main>

    </div>
  );
}
