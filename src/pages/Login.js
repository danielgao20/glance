import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token); // Save token
      login(username); // Update context
      window.location.href = "/"; // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-zinc-800 p-8 rounded">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-zinc-900 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-zinc-900 text-white"
          required
        />
        <button className="p-2 bg-emerald-500 rounded text-white">Login</button>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-emerald-400 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
