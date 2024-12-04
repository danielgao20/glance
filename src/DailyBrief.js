import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import dailyBriefIcon from "./img/dailyBriefIcon.svg";

const DailyBrief = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const mockBriefData = {
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    tasks: [
      {
        type: "Code Review",
        description:
          "Reviewed and approved 3 PRs for the authentication feature",
      },
      {
        type: "Development",
        description: "Fixed 2 critical bugs in the user dashboard",
      },
      {
        type: "Meeting",
        description: "Participated in daily standup and sprint planning",
      },
    ],
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center bg-zinc-900 rounded-lg py-4 px-5 hover:bg-zinc-800 transition-colors w-18"
      >
        <img
          src={dailyBriefIcon}
          className="h-[18px] w-[18px] mr-2"
          alt="Daily Brief"
        />
        <span className="text-sm font-medium">Daily Brief</span>
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
              Daily Brief - {mockBriefData.date}
            </DialogTitle>

            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                {mockBriefData.tasks.map((task, index) => (
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

              <div className="pt-4 border-t border-zinc-800">
                <h3 className="text-sm text-white font-medium mb-2">Summary</h3>
                <p className="text-sm text-zinc-400">
                  Yesterday was productive with focus on code quality and team
                  collaboration. Completed all planned tasks and contributed to
                  project milestones.
                </p>
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
