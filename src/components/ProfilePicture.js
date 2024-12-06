"use client";

import React, { useContext } from "react";
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

const ProfilePicture = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const options = [
    { label: "Status", icon: <Circle className="w-4 h-4 text-green-500" /> },
    { label: "Free Plan", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Personal Info", icon: <User className="w-4 h-4" /> },
    { label: "Settings", icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors focus:outline-none">
          <img src={pfpIcon} className="h-12 w-12" alt="Profile" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
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
  );
};

export default ProfilePicture;
