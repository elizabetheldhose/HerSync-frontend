import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Heart,
  X
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  return (
    <>
      {/* Overlay (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0 h-full
          w-64
          bg-white/80 backdrop-blur-md
          border-r border-white/40
          p-6 shadow-sm
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <BrandLogo />
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:block mb-10">
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
          >
            <Heart size={18} />
            Wellness
          </NavLink>

        </nav>
      </aside>
    </>
  );
}