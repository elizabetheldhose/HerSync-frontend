import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-md border-r border-white/40 p-6 shadow-sm">

      <div className="mb-10">
        <BrandLogo />
      </div>

      <nav className="space-y-3 text-mutedText">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "bg-rose-100 text-softRose shadow-sm"
                : "hover:bg-rose-50"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "bg-rose-100 text-softRose shadow-sm"
                : "hover:bg-rose-50"
            }`
          }
        >
          <CheckSquare size={18} />
          Productivity
        </NavLink>

        <NavLink
          to="/finance"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "bg-rose-100 text-softRose shadow-sm"
                : "hover:bg-rose-50"
            }`
          }
        >
          <Wallet size={18} />
          Balance
        </NavLink>

        <NavLink
          to="/health"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "bg-rose-100 text-softRose shadow-sm"
                : "hover:bg-rose-50"
            }`
          } 
        >
          <Heart size={18} />
          Wellness
        </NavLink>


      </nav>

    </aside>
  );
}
