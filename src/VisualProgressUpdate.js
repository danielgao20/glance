import React, { useState } from "react";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { X } from "lucide-react";

export default function VisualProgressUpdate({
  userName = "Daniel Gao",
  userAvatar = "/placeholder.svg?height=48&width=48",
  title = "Bugs Resolved",
  screenshot = "/placeholder.svg?height=600&width=800",
  description = "Fixed critical UI bugs in the dashboard component, improving overall user experience and interface responsiveness. Implemented proper error handling and edge cases.",
}) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <><div className="border-0 overflow-hidden rounded-lg mx-2 w-fit">
      <div className="p-4 space-y-4">
        {/* User Info and Title */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-4">
            {/* Profile Section */}
            <div className="flex flex-shrink-0">
              <img
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full" />
            </div>

            {/* Name and Description */}
            <div className="flex flex-col">
              <span className="text-md font-medium text-white">{userName}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-emerald-500/10 text-[8px] text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500/20 rounded-md py-0.75 px-1">
                  Progress Update
                </div>
                <span className="text-xs text-white break-words max-w-[14rem]">{title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div
          className="relative rounded-lg overflow-hidden border-2 border-[#414344] cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => setIsImageExpanded(true)}
        >
          <img
            src={screenshot}
            alt={`Screenshot for ${title}`}
            className="w-full h-48 object-cover" />
        </div>
      </div>
    </div><Dialog open={isImageExpanded} onOpenChange={setIsImageExpanded}>
        <DialogContent className="max-w-[95vw] lg:max-w-[1200px] p-6 bg-zinc-900 border border-zinc-800">
          <div className="space-y-4">
            {/* Header with close button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button
                onClick={() => setIsImageExpanded(false)}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden">
              <img
                src={screenshot}
                alt={`Screenshot for ${title}`}
                className="w-full h-auto object-contain max-h-[70vh]" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 leading-relaxed">
                {description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-6 h-6 rounded-full" />
                <span className="text-sm text-zinc-400">{userName}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog></>
  );
}