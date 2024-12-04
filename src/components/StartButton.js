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
      className="flex items-center bg-zinc-900 border-2 border-emerald-500 rounded-lg p-4 hover:bg-emerald-500"
    >
      <span className="text-sm font-medium">Start Session</span>
    </button>
  );
};

export default StartButton;
