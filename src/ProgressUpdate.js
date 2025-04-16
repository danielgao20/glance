import React, { useState, useEffect } from "react";

const ProgressUpdate = ({ updates, username, timeFilter, resetUpdate }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset summary when time filter changes
  useEffect(() => {
    if (resetUpdate) {
      setSummary("");
    }
  }, [resetUpdate, timeFilter]);

  const generateSummary = async () => {
    setIsLoading(true);
    
    if (updates.length === 0) {
      setSummary("No updates available for the selected time period.");
      setIsLoading(false);
      return;
    }
    
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
      console.log("API response:", data);
      
      // Format the summary for Slack
      const formattedSummary = formatForSlack(data.summary, timeFilter, username);
      
      setSummary(formattedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Error generating summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format summary for Slack
  const formatForSlack = (rawSummary, timeFrame, username) => {
    let formattedSummary = "";
    
    // Optional: Add a header if desired
    // formattedSummary += `*${timeFrame} Update from ${username}*\n\n`;
    
    // Try to parse the summary if it's a JSON string;
    // If it fails, return the raw summary.
    let parsedSummary = rawSummary;
    if (typeof rawSummary === 'string') {
      try {
        parsedSummary = JSON.parse(rawSummary);
      } catch (e) {
        // Fall back to the raw string if parsing fails.
        return rawSummary;
      }
    }
    
    // If the parsedSummary is an array of objects
    if (Array.isArray(parsedSummary)) {
      parsedSummary.forEach(item => {
        if (item.username === "GENERAL") {
          formattedSummary += `${item.text}\n\n`;
        } else {
          formattedSummary += `• ${item.text}\n`;
        }
      });
    } else {
      // Fallback if the format is unexpected
      formattedSummary += typeof parsedSummary === 'string' 
        ? parsedSummary 
        : JSON.stringify(parsedSummary, null, 2);
    }
    
    return formattedSummary;
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
              <div className="whitespace-pre-line leading-[30px] text-sm">
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
