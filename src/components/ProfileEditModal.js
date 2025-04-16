import React, { useState, useRef } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { X, Upload, Camera } from "lucide-react";

const ProfileEditModal = ({ isOpen, onClose, onSave, currentUser }) => {
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.profileImage || null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    onSave({
      displayName,
      profileImage,
      previewUrl
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close
    setDisplayName(currentUser?.displayName || "");
    setProfileImage(currentUser?.profileImage || null);
    setPreviewUrl(currentUser?.profileImage || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-zinc-800 w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
            <button
              onClick={handleCancel}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-zinc-800 overflow-hidden">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
              </div>
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-sm text-zinc-400">
              Click the icon to upload a new profile picture
            </p>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <label htmlFor="displayName" className="block text-sm font-medium text-zinc-300">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your display name"
            />
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
              disabled={!displayName.trim()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;