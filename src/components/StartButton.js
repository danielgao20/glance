import React, { useState, useRef } from "react";
import { sendScreenshot } from "../api";

const StartButton = ({ onSessionEnd }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showIntervalModal, setShowIntervalModal] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(30); // default 30s
  const [pendingStart, setPendingStart] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const intervalOptions = [5, 10, 30, 60, 120, 300]; // seconds: 5s, 10s, 30s, 1m, 2m, 5m

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
    setPendingStart(false);
    // Wait 10 seconds before first screenshot
    timeoutRef.current = setTimeout(() => {
      captureScreenshot();
      intervalRef.current = setInterval(
        captureScreenshot,
        selectedInterval * 1000
      );
    }, 10000);
  };

  const stopSession = async () => {
    setIsRunning(false);
    setPendingStart(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Refresh screenshots when session ends
    await onSessionEnd();
  };

  const handleClick = () => {
    if (isRunning) {
      stopSession();
    } else {
      setShowIntervalModal(true);
    }
  };

  const handleConfirmInterval = () => {
    setShowIntervalModal(false);
    setPendingStart(true);
    startSession();
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Custom dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`
          relative flex items-center rounded-lg p-4 overflow-hidden group transition-all duration-300
          ${
            isRunning
              ? "bg-red-500 hover:bg-red-600 border-2 border-red-500"
              : "bg-zinc-900 border-2 border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          }
        `}
        disabled={pendingStart}
      >
        <span
          className={`
            text-sm font-medium relative z-10 transition-colors duration-300
            ${
              isRunning ? "text-white" : "text-emerald-500 group-hover:text-white"
            }
          `}
        >
          {isRunning ? "Stop Session" : pendingStart ? "Starting..." : "Start Session"}
        </span>
        {!isRunning && !pendingStart && (
          <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors duration-300 ease-in-out" />
        )}
      </button>
      {/* Modern interval selection popup */}
      {showIntervalModal && (
        <div
          className="absolute left-1/2 z-50 mt-2 w-72 -translate-x-1/2"
          style={{ minWidth: '240px' }}
        >
          {/* Arrow caret */}
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-zinc-800 rotate-45 -mb-1 border-t border-l border-zinc-700" />
          </div>
          <div
            ref={dropdownRef}
            className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl px-6 py-5 flex flex-col items-center animate-fade-in"
          >
            <h2 className="text-base font-normal mb-4 text-white">Select Screenshot Interval</h2>
            <div className="relative w-full mb-5">
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-zinc-800 transition"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                tabIndex={0}
              >
                <span>
                  {selectedInterval < 60
                    ? `${selectedInterval} seconds`
                    : `${selectedInterval / 60} minutes`}
                </span>
                <svg
                  className={`ml-2 h-4 w-4 text-emerald-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <ul
                  className="absolute z-10 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in"
                  role="listbox"
                  tabIndex={-1}
                >
                  {intervalOptions.map((opt, idx) => (
                    <li
                      key={opt}
                      role="option"
                      aria-selected={selectedInterval === opt}
                      className={`px-4 py-2 cursor-pointer hover:bg-emerald-600 hover:text-white text-zinc-200 ${selectedInterval === opt ? 'bg-emerald-700 text-white' : ''}`}
                      onClick={() => {
                        setSelectedInterval(opt);
                        setDropdownOpen(false);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedInterval(opt);
                          setDropdownOpen(false);
                        }
                      }}
                      tabIndex={0}
                    >
                      {opt < 60 ? `${opt} seconds` : `${opt / 60} minutes`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-normal transition mb-2"
              onClick={handleConfirmInterval}
            >
              Confirm
            </button>
            <button
              className="w-full bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded-lg font-normal transition"
              onClick={() => setShowIntervalModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartButton;
