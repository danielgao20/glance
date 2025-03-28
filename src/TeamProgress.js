import React, { useState, useEffect, useRef } from "react";
import TimeFilterDropdown from "./TimeFilterDropdown";

const colorMapping = {
  GENERAL: "bg-transparent",
  David: "bg-blue-500/30",
  david: "bg-blue-500/30",
  Jon: "bg-yellow-500/30",
  jon: "bg-yellow-500/30",
  Josephine: "bg-purple-500/30",
  josephine: "bg-purple-500/30",
  Daniel: "bg-emerald-500/30",
  daniel: "bg-emerald-500/30",
  dgao: "bg-red-500/30"
};

const TeamProgress = ({ updates }) => {
  // Log each render to track component lifecycle
  console.log("TeamProgress rendering, updates length:", updates?.length);
  
  // Use useState with localStorage initialization for persistence
  const [summary, setSummary] = useState(() => {
    const savedSummary = localStorage.getItem('teamSummary');
    if (savedSummary) {
      try {
        return JSON.parse(savedSummary);
      } catch (e) {
        console.error("Error parsing saved summary:", e);
        return [];
      }
    }
    return [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Also keep a ref as backup in case component remounts
  const summaryRef = useRef([]);
  
  // Update ref and localStorage when summary changes
  useEffect(() => {
    console.log("Summary state updated:", summary);
    summaryRef.current = summary;
    
    if (summary.length > 0) {
      localStorage.setItem('teamSummary', JSON.stringify(summary));
    }
  }, [summary]);
  
  // Debug effect to track updates prop changes
  useEffect(() => {
    console.log("Updates prop changed, new length:", updates?.length);
  }, [updates]);

  const generateSummary = async () => {
    setIsLoading(true);
    console.log("Generating summary from updates:", updates);
    
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
      console.log("Raw summary data:", data.summary);
      
      // Check if the summary is a string that needs parsing
      let parsedSummary;
      if (typeof data.summary === 'string') {
        try {
          parsedSummary = JSON.parse(data.summary);
        } catch (e) {
          console.error("Error parsing summary:", e);
          // If parsing fails, try to clean the string
          const cleanedSummary = data.summary.replace(/\n/g, '').trim();
          try {
            parsedSummary = JSON.parse(cleanedSummary);
          } catch (e2) {
            console.error("Error parsing cleaned summary:", e2);
            // Last resort - check if it looks like array syntax
            if (data.summary.startsWith('[') && data.summary.endsWith(']')) {
              console.log("Applying manual parsing for array-like string");
              try {
                // Force evaluation as JavaScript (use with caution)
                // eslint-disable-next-line no-eval
                parsedSummary = eval(`(${data.summary})`);
              } catch (e3) {
                console.error("All parsing attempts failed:", e3);
              }
            }
          }
        }
      } else {
        // If it's not a string, assume it's already parsed
        parsedSummary = data.summary;
      }
      
      console.log("Final parsed summary:", parsedSummary);
      
      // Extra safety check before setting state
      if (Array.isArray(parsedSummary) && parsedSummary.length > 0) {
        // Store in ref immediately
        summaryRef.current = parsedSummary;
        // Update state
        setSummary(parsedSummary);
        // Also keep in localStorage for persistence
        localStorage.setItem('teamSummary', JSON.stringify(parsedSummary));
        console.log("Summary state and storage updated successfully");
      } else {
        console.error("Summary is not a valid array or is empty:", parsedSummary);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use the summary state or fallback to the ref if state is empty
  const displaySummary = summary.length > 0 ? summary : summaryRef.current;

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
          {displaySummary.length > 0 ? (
            <p className="leading-[30px]">
              {displaySummary.map((item, index) => (
                <span
                  key={index}
                  className={`${
                    colorMapping[item.username] || "bg-zinc-500/10"
                  } p-1 rounded`}
                >
                  {item.text}{' '}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-zinc-500">
              Click 'Generate Summary' to analyze team progress.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamProgress;
