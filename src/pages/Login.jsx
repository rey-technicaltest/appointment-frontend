import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userId", res.data.data.user.id);
      navigate("/appointments");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
