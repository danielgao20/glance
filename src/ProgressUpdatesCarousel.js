"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VisualProgressUpdate from "./VisualProgressUpdate";

const ProgressUpdatesScroll = ({ updates }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
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
          className="flex w-full overflow-x-auto rounded-lg bg-zinc-900 pr-4 border-2 border-[#414344] scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {updates.map((update, index) => (
            <div key={index} className="flex-none w-112 snap-start px-0">
              <VisualProgressUpdate {...update} />
            </div>
          ))}
        </div>

        {/* Gradient overlay for blur effect */}
        <div
          className="absolute top-0 right-0 bottom-0 w-40 pointer-events-none rounded-lg"
          style={{
            background:
              "linear-gradient(to right, rgba(24, 24, 27, 0) 0%, rgb(24, 24, 27) 60%)",
          }}
        />
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
