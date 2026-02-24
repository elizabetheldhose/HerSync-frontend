import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import BrandLogo from "../components/BrandLogo";  


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("https://hersync-backend.onrender.com/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate("/dashboard");
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition"
            />
          </div>

          <div>
            <label className="text-sm text-mutedText block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition"
            />
          </div>

          <button className="w-full bg-softRose text-white py-3 rounded-xl hover:bg-roseDark transition" onClick={login}>
            Sign In
          </button>

        </div>

      </div>

    </div>
  );

}
