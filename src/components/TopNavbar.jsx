import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const { profile } = useProfile();
  const [preview, setPreview] = useState(profile?.avatar);
  const navigate = useNavigate();
  
  console.log("profile in navbar", profile);

  const handleLogout = () => {  
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  useEffect(() => {
    setPreview(profile?.avatar);
  }, [profile]);

  

  return (
    <div className="flex justify-end items-center mb-8 relative">

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={preview || "/default-avatar.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
        />
        <ChevronDown size={16} className="text-mutedText" />
      </div>

      {open && (
        <div className="absolute top-14 right-0 bg-white rounded-xl shadow-md p-4 w-40 border border-gray-100">
          <p className="text-sm hover:text-softRose cursor-pointer mb-2" onClick={() => navigate("/profile")}>
            Profile
          </p>
          <p className="text-sm hover:text-softRose cursor-pointer" onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
