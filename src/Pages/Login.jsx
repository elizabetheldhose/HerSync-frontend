import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import BrandLogo from "../components/BrandLogo";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ FIX: Use AuthContext instead of raw localStorage

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });

      // ✅ FIX: Store token AND role via AuthContext
      login(response.data.token, response.data.role);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-blush flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 w-full max-w-md">
        <div className="mb-10 text-center">
          <BrandLogo size="text-4xl" />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-mutedText block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-softRose transition"
            />
            {error && <div className="error-box mt-2">{error}</div>}
          </div>

          <button
            className="w-full bg-softRose text-white py-3 rounded-xl hover:bg-roseDark transition disabled:opacity-60"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-mutedText mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-softRose hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
