import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import projectDetailsIcon from "./img/projectDetailsIcon.svg";

const DailyBrief = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const mockProjectData = {
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    tasks: [
      {
        type: "Core Gameplay Loop",
        description:
          "Curate a playable experience for player where their actions result in fun interactions",
      },
      {
        type: "3D Models",
        description:
          "Model characters, enemies, and landscape elements for the game",
      },
      {
        type: "Music + SFX",
        description:
          "Find necessary audio components to immerse player further within game",
      },
    ],
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors w-18"
      >
        <img
          src={projectDetailsIcon}
          className="h-[18px] w-[18px] mr-2"
          alt="Project Details"
        />
        <span className="text-sm font-medium">Project Details</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Background backdrop */}
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-2xl w-full bg-zinc-900 rounded-lg p-6 shadow-xl">
            <DialogTitle className="text-xl font-semibold text-white">
              Project Details
            </DialogTitle>

            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                {mockProjectData.tasks.map((task, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <h3 className="font-medium text-sm text-zinc-200">
                        {task.type}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 pl-4">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
            >
              ✕
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DailyBrief;
