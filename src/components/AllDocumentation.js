import React from "react";
import Documentation from "./Documentation";

const documentationItems = [
  {
    title: "Compilation of Issues",
    description:
      "A comprehensive list of all known issues and bugs in the project.",
    category: "Team Progress",
    lastUpdated: "2024-11-30",
  },
  {
    title: "Timeline & Milestones",
    description: "Project timeline with key milestones and deadlines.",
    category: "Team Progress",
    lastUpdated: "2024-11-29",
  },
  {
    title: "Game Design Document",
    description:
      "Detailed game design document outlining core mechanics and features.",
    category: "Team Progress",
    lastUpdated: "2024-11-28",
  },
  {
    title: "Character Iterations",
    description: "Evolution of character designs through multiple iterations.",
    category: "3D Models",
    lastUpdated: "2024-11-27",
  },
  {
    title: "Weapon Models",
    description: "3D models and textures for all in-game weapons.",
    category: "3D Models",
    lastUpdated: "2024-11-26",
  },
  {
    title: "Rigged Assets",
    description: "Fully rigged 3D assets ready for animation.",
    category: "3D Models",
    lastUpdated: "2024-11-25",
  },
  {
    title: "Bugs",
    description:
      "Detailed reports of identified bugs and their current status.",
    category: "Development",
    lastUpdated: "2024-11-24",
  },
  {
    title: "Tech Stack",
    description: "Overview of the technology stack used in the project.",
    category: "Development",
    lastUpdated: "2024-11-23",
  },
  {
    title: "Specification & Features",
    description: "Detailed specifications of game features and functionality.",
    category: "Development",
    lastUpdated: "2024-11-22",
  },
];

const AllDocumentation = () => {
  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">All Documentation</h1>
      <Documentation items={documentationItems} />
    </div>
  );
};

export default AllDocumentation;
