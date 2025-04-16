"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VisualProgressUpdate from "./VisualProgressUpdate";

const ProgressUpdatesScroll = ({ updates, onDelete }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      const currentScroll = container.scrollLeft;
      container.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full opacity-50 bg-zinc-800 hover:bg-zinc-700 hover:opacity-80 transition-colors"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex w-full min-h-[300px] overflow-x-auto rounded-lg bg-zinc-900 border-2 border-[#414344] scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {updates.map((update, index) => (
            <div key={index} className="flex-none w-112 snap-center px-4">
              <VisualProgressUpdate {...update} fileId={update.fileId} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full opacity-50 bg-zinc-800 hover:bg-zinc-700 hover:opacity-80 transition-colors"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default ProgressUpdatesScroll;
