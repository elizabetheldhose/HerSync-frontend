import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {


  return (
    <nav className="w-full px-4 md:px-8 py-4 
                    flex items-center justify-between 
                    bg-white/70 dark:bg-gray-900/70 
                    backdrop-blur-md 
                    border-b border-gray-200 dark:border-gray-700">

      {/* Logo / Title */}
      <h3 className="text-lg md:text-xl font-medium text-gray-800 dark:text-white">
        HerSync
      </h3>

    </nav>
  );
}