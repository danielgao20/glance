import React, { useState, useRef } from "react";
import { sendScreenshot } from "../api";

const StartButton = ({ onSessionEnd }) => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const captureScreenshot = async () => {
    try {
      const username = localStorage.getItem("username");

      if (!window.electronAPI) {
        throw new Error("electronAPI is not available");
      }

      window.electronAPI.sendMessage("capture-screenshot");

      const screenshotPath = await new Promise((resolve, reject) => {
        window.electronAPI.onMessage("screenshot-captured", resolve);
        window.electronAPI.onMessage("screenshot-error", reject);
      });

      // Add default text for carousel and progress
      const timestamp = new Date().toLocaleTimeString();
      const carouselText = `Progress Update at ${timestamp}`;
      const progressText = `Captured screenshot of current work in progress at ${timestamp}`;

      await sendScreenshot(
        username,
        screenshotPath,
        carouselText,
        progressText
      );
      console.log("Screenshot saved successfully");
    } catch (error) {
      console.error("Error capturing screenshot:", error.message);
    }
  };

  const startSession = () => {
    setIsRunning(true);
    captureScreenshot();
    intervalRef.current = setInterval(captureScreenshot, 30000);
  };

  const stopSession = async () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Refresh screenshots when session ends
    await onSessionEnd();
  };

  const handleClick = () => {
    if (isRunning) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative flex items-center rounded-lg p-4 overflow-hidden group transition-all duration-300
        ${
          isRunning
            ? "bg-red-500 hover:bg-red-600 border-2 border-red-500"
            : "bg-zinc-900 border-2 border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        }
      `}
    >
      <span
        className={`
          text-sm font-medium relative z-10 transition-colors duration-300
          ${
            isRunning ? "text-white" : "text-emerald-500 group-hover:text-white"
          }
        `}
      >
        {isRunning ? "Stop Session" : "Start Session"}
      </span>
      {!isRunning && (
        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors duration-300 ease-in-out" />
      )}
    </button>
  );
};

export default StartButton;
