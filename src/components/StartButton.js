import React from "react";
import { sendScreenshot } from "../api";

const StartButton = () => {
  const handleClick = async () => {
    try {
      console.log("Starting screenshot session...");
      const username = localStorage.getItem("username");

      if (!window.electronAPI) {
        throw new Error("electronAPI is not available. Check preload.js and main.js configuration.");
      }

      // Add a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Capture the screenshot
      window.electronAPI.sendMessage("capture-screenshot");

      // Wait for the screenshot path
      const screenshotPath = await new Promise((resolve, reject) => {
        window.electronAPI.onMessage("screenshot-captured", resolve);
        window.electronAPI.onMessage("screenshot-error", reject);
      });

      console.log("Screenshot captured at:", screenshotPath);

      // Send the screenshot path and username to the backend
      const response = await sendScreenshot(username, screenshotPath);
      console.log("Screenshot saved successfully:", response);

      alert("Screenshot captured and saved!");
    } catch (error) {
      console.error("Error capturing screenshot:", error.message);
      alert("Failed to capture screenshot.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center bg-zinc-900 border-2 border-emerald-500 rounded-lg p-4 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    >
      <span className="text-sm font-medium relative z-10 text-emerald-500 group-hover:text-white transition-colors duration-300">
        Start Session
      </span>
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors duration-300 ease-in-out" />
    </button>
  );
};

export default StartButton;
