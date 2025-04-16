import React, { useState, useContext } from "react";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { X, Trash2 } from "lucide-react";
import AuthContext from "./context/AuthContext";

export default function VisualProgressUpdate({
  userName,
  userAvatar = "/placeholder.svg?height=48&width=48",
  carouselText = "Bugs Resolved",
  screenshot = "/placeholder.svg?height=600&width=800",
  fileId,
  onDelete,
}) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const { profile } = useContext(AuthContext);

  // Determine if this update belongs to the current user
  const isCurrentUser = profile && profile.username === userName;

  // Use profile image if this is the current user and they have a custom profile image
  const displayAvatar = isCurrentUser && profile.profileImage
    ? `http://localhost:5001${profile.profileImage}`
    : userAvatar;

  // Use display name if this is the current user and they have a custom display name
  const displayName = isCurrentUser && profile.displayName
    ? profile.displayName
    : userName;

  return (
    <>
      <div className="border-0 overflow-hidden rounded-lg mx-2 w-fit">
        <div className="p-4 space-y-4">
          {/* User Info and carouselText */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-4">
              {/* Profile Section */}
              <div className="flex flex-shrink-0">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Name and Description */}
              <div className="flex flex-col">
                <span className="text-md font-medium text-white">
                  {displayName}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-emerald-500/10 text-[8px] text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500/20 rounded-md py-0.75 px-1">
                    Progress Update
                  </div>
                  <span className="text-xs text-white break-words max-w-[14rem]">
                    {carouselText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          <div className="relative rounded-lg overflow-hidden border-2 border-[#414344]">
            <img
              src={screenshot}
              alt={`Screenshot for ${carouselText}`}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => setIsImageExpanded(true)}
            />
          </div>
        </div>
      </div>
      <Dialog open={isImageExpanded} onOpenChange={setIsImageExpanded}>
        <DialogContent className="max-w-[95vw] lg:max-w-[1200px] p-6 bg-zinc-900 border border-zinc-800">
          <div className="space-y-4">
            {/* Header with debug info */}
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{carouselText}</h3>

              <div className="flex gap-2 items-center ml-auto">
                {fileId && onDelete && (
                  <button
                    className="p-2 rounded-full bg-zinc-900/80 hover:bg-red-600 hover:text-white transition-colors shadow-lg z-50"
                    title="Delete screenshot"
                    style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.3)' }}
                    onClick={() => { setIsImageExpanded(false); onDelete(fileId); }}
                  >
                    <Trash2 className="h-5 w-5 text-white" />
                  </button>
                )}
                <button
                  onClick={() => setIsImageExpanded(false)}
                  className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={screenshot}
                alt={`Screenshot for ${carouselText}`}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-zinc-400">{displayName}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}