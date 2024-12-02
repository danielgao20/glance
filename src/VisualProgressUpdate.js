import React from "react";

export default function VisualProgressUpdate({
  userName = "Daniel Gao",
  userAvatar = "/placeholder.svg?height=48&width=48",
  title = "Bugs Resolved",
  screenshot = "/placeholder.svg?height=600&width=800",
}) {
  return (
    <div className="bg-zinc-900 border-0 overflow-hidden rounded-lg shadow-lg mx-2 w-96">
      <div className="p-4 space-y-4">
        {/* User Info and Title */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt={userName}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-white">{userName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{title}</span>
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
