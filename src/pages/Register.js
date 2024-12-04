import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      alert("Registration successful! Please log in.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-zinc-800 p-8 rounded">
        <h1 className="text-xl font-bold">Register</h1>
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
        <button className="p-2 bg-emerald-500 rounded text-white">Register</button>
        <p>
          Have an account?{" "}
          <a href="/login" className="text-emerald-400 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
