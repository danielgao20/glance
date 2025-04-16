import React, { useContext, useState, useEffect } from "react";
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
  Edit,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import pfpIcon from "../img/pfpIcon.svg";
import ProfileEditModal from "./ProfileEditModal";

const ProfilePicture = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    displayName: "",
    profileImage: null
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Error parsing saved profile:", e);
      }
    } else if (user) {
      // If no saved profile but user exists, initialize with username
      setUserProfile({
        displayName: user,
        profileImage: null
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // Save to localStorage for persistence
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const options = [
    { 
      label: "Status", 
      icon: <Circle className="w-4 h-4 text-green-500" />,
      action: null
    },
    { 
      label: "Free Plan", 
      icon: <CreditCard className="w-4 h-4" />,
      action: null
    },
    { 
      label: "Edit Profile", 
      icon: <Edit className="w-4 h-4" />,
      action: handleEditProfile
    },
    { 
      label: "Settings", 
      icon: <SettingsIcon className="w-4 h-4" />,
      action: null
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors focus:outline-none">
            {userProfile.previewUrl ? (
              <img 
                src={userProfile.previewUrl} 
                className="h-12 w-12 rounded-full object-cover"
                alt="Profile" 
              />
            ) : (
              <img src={pfpIcon} className="h-12 w-12" alt="Profile" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* User info header */}
          <div className="px-3 py-3 border-b border-zinc-700">
            <p className="text-white font-medium">{userProfile.displayName || user}</p>
            <p className="text-xs text-zinc-400">{user}</p>
          </div>
          
          {/* Menu options */}
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              className="px-3 py-3 text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
              onClick={option.action}
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
        currentUser={userProfile}
      />
    </>
  );
};

export default ProfilePicture;