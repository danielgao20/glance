import React, { useState, useEffect, useRef } from "react";

const ProgressUpdate = ({ updates, username, timeFilter, resetUpdate }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref to track if we should reset the summary
  const shouldResetRef = useRef(false);
  
  // Only reset summary when resetUpdate changes from false to true
  useEffect(() => {
    if (resetUpdate) {
      shouldResetRef.current = true;
    }
  }, [resetUpdate]);
  
  // Apply the reset when needed, but only once
  useEffect(() => {
    if (shouldResetRef.current) {
      setSummary("");
      shouldResetRef.current = false;
    }
  }, [timeFilter]);

  const generateSummary = async () => {
    setIsLoading(true);
    
    if (updates.length === 0) {
      setSummary("No updates available for the selected time period.");
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("Generating summary for updates:", updates);
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
      console.log("Summary response data:", data);
      
      // Store the raw summary directly without parsing or formatting
      if (data && data.summary) {
        setSummary(data.summary);
        console.log("Setting summary to:", data.summary);
      } else {
        setSummary("No summary could be generated.");
        console.warn("No summary data received from API");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Error generating summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary).then(
      () => {
        alert("Summary copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 rounded-lg border-2 border-[#414344] overflow-hidden">
      <div className="p-8 pb-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Progress Update</h2>
          <button
            onClick={generateSummary}
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            {isLoading ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </div>
      <div className="flex-1 scrollbar-hide overflow-y-auto overflow-x-hidden p-8 pt-2">
        <div className="flex flex-col gap-4">
          {summary ? (
            <>
              <div className="whitespace-pre-line leading-[30px]">
                {summary}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Copy
                </button>
              </div>
            </>
          ) : (
            <div className="text-zinc-500">
              <p>
                Click 'Generate Summary' to create a progress update for <span className="font-medium text-zinc-400">{timeFilter}</span> that you can share with your team.
              </p>
              {updates.length === 0 && (
                <p className="mt-4">
                  No updates available for this time period.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdate;