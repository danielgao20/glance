import React, { useState } from "react";
import TimeFilterDropdown from "./TimeFilterDropdown";

const colorMapping = {
  GENERAL: "bg-transparent",
  daniel: "bg-blue-500/30",
  josephine: "bg-yellow-500/30",
  david: "bg-purple-500/30",
  jon: "bg-emerald-500/30",
};

const TeamProgress = ({ updates }) => {
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5001/api/screenshots/generate-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progressUpdates: updates }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // Parse the stringified JSON from the summary key
      const parsedSummary = JSON.parse(data.summary);
      setSummary(parsedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 rounded-lg border-2 border-[#414344] overflow-hidden">
      <div className="p-8 pb-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Team Progress</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={generateSummary}
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              {isLoading ? "Generating..." : "Generate Summary"}
            </button>
            <TimeFilterDropdown />
          </div>
        </div>
      </div>
      <div className="flex-1 scrollbar-hide overflow-y-auto overflow-x-hidden p-8 pt-2">
        <div className="flex flex-col gap-4">
          <p className="leading-[30px]">
            {summary.length > 0 ? (
              summary.map((item, index) => (
                <span
                  key={index}
                  className={`${
                    colorMapping[item.username] || "bg-zinc-500/10"
                  }`}
                >
                  {item.text}
                </span>
              ))
            ) : (
              <p className="text-zinc-500">
                Click 'Generate Summary' to analyze team progress.
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamProgress;
