"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  ChevronDown,
  MoreVertical,
  Plus,
  UserPlus,
  Settings,
  UserPlus2,
  LogOut,
} from "lucide-react";
import BlueHour from "./img/BlueHour.svg";
import RedTeam from "./img/RedTeam.svg";
import GreenSquad from "./img/GreenSquad.svg";

const teams = [
  { id: "1", name: "Blue Hour", icon: BlueHour },
  { id: "2", name: "Red Team", icon: RedTeam },
  { id: "3", name: "Green Squad", icon: GreenSquad },
];

export default function TeamSelector() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    // Add any additional logic for team change here
  };

  const handleJoinTeam = () => {
    // Implement join team logic
    console.log("Join team clicked");
  };

  const handleCreateTeam = () => {
    // Implement create team logic
    console.log("Create team clicked");
  };

  const handleTeamSettings = () => {
    // Implement team settings logic
    console.log("Team settings clicked");
  };

  const handleInviteMembers = () => {
    // Implement invite members logic
    console.log("Invite members clicked");
  };

  const handleLeaveTeam = () => {
    // Implement leave team logic
    console.log("Leave team clicked");
  };

  return (
    <div className="flex items-center justify-between bg-zinc-900 rounded-md py-2 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-zinc-700 transition-colors duration-200 focus:outline-none"
            aria-label="Select team"
          >
            <img
              src={selectedTeam.icon}
              alt=""
              className="w-8 h-8 rounded-md"
            />
            <span className="text-lg font-medium text-white truncate">
              {selectedTeam.name}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg"
          align="start"
        >
          <DropdownMenuLabel className="text-zinc-400 px-2 py-1.5 text-xs font-semibold">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />
          {teams.map((team) => (
            <DropdownMenuItem
              key={team.id}
              className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
              onClick={() => handleTeamChange(team)}
            >
              <div className="flex items-center gap-3 w-full">
                <img
                  src={team.icon}
                  alt=""
                  className="w-6 h-6 rounded-md flex-shrink-0"
                />
                <span className="text-sm font-medium text-white truncate">
                  {team.name}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem
            className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
            onClick={handleJoinTeam}
          >
            <div className="flex items-center gap-3 text-zinc-400">
              <UserPlus className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Join Team</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
            onClick={handleCreateTeam}
          >
            <div className="flex items-center gap-3 text-zinc-400">
              <Plus className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Create Team</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2 rounded-md hover:bg-zinc-800 transition-colors duration-200 focus:outline-none"
            aria-label="Team options"
          >
            <MoreVertical className="h-5 w-5 text-zinc-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg"
          align="end"
        >
          <DropdownMenuItem
            className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
            onClick={handleTeamSettings}
          >
            <div className="flex items-center gap-3 text-zinc-400">
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Team Settings</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
            onClick={handleInviteMembers}
          >
            <div className="flex items-center gap-3 text-zinc-400">
              <UserPlus2 className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Invite Members</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem
            className="px-2 py-2 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer transition-colors duration-150"
            onClick={handleLeaveTeam}
          >
            <div className="flex items-center gap-3 text-red-400">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Leave Team</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
