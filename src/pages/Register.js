// Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import glanceLogo from "../img/Subtract.svg";

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
    <div className="flex items-center justify-center h-screen bg-black text-white font-inter">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <img src={glanceLogo} className="h-12 w-9 mr-3" alt="Logo" />
            <h1 className="font-custom text-4xl">glance</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-zinc-900 rounded-lg h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white border border-[#414344]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-900 rounded-lg h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white border border-[#414344]"
              required
            />
          </div>
          <button className="h-12 bg-zinc-900 rounded-lg text-sm hover:bg-zinc-800 transition-colors border border-[#414344]">
            Create Account
          </button>
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
