import React from "react";
import { Badge } from "./components/ui/badge";

export default function VisualProgressUpdate({
  userName = "Daniel Gao",
  userAvatar = "/placeholder.svg?height=48&width=48",
  title = "Bugs Resolved",
  screenshot = "/placeholder.svg?height=600&width=800",
}) {
  return (
    <div className="border-0 overflow-hidden rounded-lg mx-2 w-fit">
      <div className="p-4 space-y-4">
        {/* User Info and Title */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-4">
            {/* Profile Section */}
            <div className="flex flex-shrink-0">
              <img
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full"
              />
            </div>

            {/* Name and Description */}
            <div className="flex flex-col">
              <span className="text-md font-medium text-white">{userName}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-emerald-500/10 text-[8px] text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500/20 rounded-md py-0.75 px-1">
                  Progress Update
                </div>
                <span className="text-xs text-white">{title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative rounded-lg overflow-hidden border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <img
            src={screenshot}
            alt={`Screenshot for ${title}`}
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
