"use client";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Circle,
  CreditCard,
  User,
  Settings as SettingsIcon,
} from "lucide-react";
import pfpIcon from "../img/pfpIcon.svg";
import AuthContext from "../context/AuthContext";
import ProfileEditModal from "./ProfileEditModal";
import { updateUserProfile } from "../api";

const ProfilePicture = () => {
  const { logout, profile, updateProfile } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (profileData) => {
    try {
      const updatedProfile = await updateUserProfile(profileData);
      updateProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const options = [
    { label: "Status", icon: <Circle className="w-4 h-4 text-green-500" /> },
    { label: "Free Plan", icon: <CreditCard className="w-4 h-4" /> },
    { 
      label: "Edit Profile", 
      icon: <User className="w-4 h-4" />,
      onClick: handleEditProfile 
    },
    { label: "Settings", icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  // Determine profile image source
  const profileImageSrc = profile?.profileImage 
    ? `http://localhost:5001${profile.profileImage}` 
    : pfpIcon;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors focus:outline-none">
            <img 
              src={profileImageSrc} 
              className="h-12 w-12 rounded-full object-cover"
              alt="Profile" 
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* User info section */}
          <div className="px-3 py-3 border-b border-zinc-700">
            <div className="font-medium text-sm text-white">
              {profile?.displayName || profile?.username || "User"}
            </div>
            <div className="text-xs text-zinc-400">
              {profile?.username || ""}
            </div>
          </div>

          {/* Options */}
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={option.onClick}
              className="px-3 py-3 text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </DropdownMenuItem>
          ))}
          
          {/* Log Out Option */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="px-3 py-3 text-sm text-red-500 hover:bg-red-700/20 transition-colors cursor-pointer"
          >
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Edit Modal */}
      <ProfileEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        currentUser={profile}
      />
    </>
  );
};

export default ProfilePicture;