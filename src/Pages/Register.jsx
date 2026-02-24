import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";


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
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
    </div>
    </div>
  );
}
