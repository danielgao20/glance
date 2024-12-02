import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TimeFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("This Week");

  const options = ["Today", "This Week", "This Month"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-lg text-sm hover:bg-zinc-700/80 transition-colors"
      >
        {selected}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-left text-sm hover:bg-zinc-700 transition-colors
                ${option === selected ? "bg-zinc-700" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeFilterDropdown;
