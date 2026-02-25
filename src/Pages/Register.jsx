import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import BrandLogo from "../components/BrandLogo";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("https://hersync-backend.onrender.com/api/auth/register", form);
    // alert("Registered successfully");
    navigate("/");
  };

  return (
   <div className="min-h-screen bg-blush flex items-center justify-center p-6">
   
         <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 w-full max-w-md">
   
           <div className="mb-10 text-center">
             <BrandLogo size="text-4xl" />
           </div>
           <div className="space-y-6">


          <div>
            <label className="text-sm text-mutedText block mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition"
            />
          </div>
        {/* <input name="name" placeholder="Name" onChange={handleChange} /> */}
        <div>
          <label className="text-sm text-mutedText block mb-2">
            Email
          </label>
           <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition" />
        </div>
        <div>
          <label className="text-sm text-mutedText block mb-2">
            Password
          </label>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition" />
        </div>
       
        
        {/* <select name="role" onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition">
          <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select> */}
      <button onClick={handleSubmit} className="w-full bg-softRose text-white py-3 rounded-xl hover:bg-roseDark transition">
        Register
      </button>
           </div>
        
    </div>
    </div>
  );
}
