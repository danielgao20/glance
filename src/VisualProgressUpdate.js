import React from "react";

export default function VisualProgressUpdate({
  userName = "Daniel Gao",
  userAvatar = "/placeholder.svg?height=48&width=48",
  title = "Bugs Resolved",
  screenshot = "/placeholder.svg?height=600&width=800",
}) {
  return (
    <div className="bg-zinc-900 border-0 overflow-hidden rounded-lg shadow-lg">
      <div className="p-4 space-y-4">
        {/* User Info and Title */}
        <div className="flex items-center gap-3">
          <img
            src={userAvatar}
            alt={userName}
            className="w-12 h-12 rounded-full"
          />
          <div className="space-y-1">
            <h3 className="text-s font-medium text-white">{userName}</h3>
            <span className="text-s text-white">{title}</span>
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative rounded-lg overflow-hidden border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <img
            src={screenshot}
            alt={`Screenshot for ${title}`}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
