"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function TimeFilterDropdown() {
  const [selected, setSelected] = useState("This Week");

  const options = ["Today", "This Week", "This Month"];

  const handleTimeChange = (option) => {
    setSelected(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#414344] bg-zinc-800/80 rounded-lg text-sm hover:bg-zinc-700/80 transition-colors duration-200 focus:outline-none"
          aria-label="Select time range"
        >
          {selected}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-32 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg"
        align="start"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            className="px-3 py-1.5 hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer transition-colors duration-150"
            onClick={() => handleTimeChange(option)}
          >
            <span
              className={`text-sm ${option === selected ? "font-medium" : ""}`}
            >
              {option}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}