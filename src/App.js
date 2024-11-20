import { useState } from "react";
import glanceLogo from "./img/Subtract.svg";
import dailyBriefIcon from "./img/dailyBriefIcon.svg";
import searchIcon from "./img/searchIcon.svg";
import projectDetailsIcon from "./img/projectDetailsIcon.svg";
import teamIcon from "./img/teamIcon.svg";
import pfpIcon from "./img/pfpIcon.svg";
import allDoc from "./img/folder.svg";
import { ChevronDown } from "lucide-react";

function App() {
  const [activeProject] = useState("Blue Hour");
  const navItems = [
    { title: "New Documentation", icon: "+" },
    {
      title: "All Documentation",
      icon: <img src={allDoc} alt="folder" />,
    },
    {
      title: "Team Progress",
      icon: "👥",
      subitems: [
        "Compilation of Issues",
        "Timeline & Milestones",
        "Game Design Document",
      ],
    },
    {
      title: "3D Models",
      icon: "🎮",
      subitems: ["Character Iterations", "Weapon Models", "Rigged Assets"],
    },
    {
      title: "Development",
      icon: "💻",
      subitems: ["Bugs", "Tech Stack", "Specification & Features"],
    },
    {
      title: "Marketing",
      icon: "📢",
      subitems: ["Successful Campaigns", "Resources"],
    },
    {
      title: "UI & UX",
      icon: "🎨",
      subitems: ["Interface Iterations", "Final User Flow"],
    },
    {
      title: "Concept Art",
      icon: "✏️",
      subitems: ["Character Art", "World Building", "Emote Templates"],
    },
  ];
  return (
    <div className="bg-black text-white h-screen w-screen fixed overflow-hidden font-inter">
      {/* TopBar */}
      <div className="flex items-center space-x-4 mt-4 py-4 mr-8 mb-2">
        {/* Logo */}
        <div className="flex items-center ml-4 mr-[130px]">
          <img src={glanceLogo} className="h-9 w-7 mr-3" alt="Logo" />
          <h1 className="font-custom text-3xl">glance</h1>
        </div>
        {/* Daily Brief */}
        <div className="flex items-center bg-zinc-900 rounded-lg p-4">
          <img
            src={dailyBriefIcon}
            className="h-[18px] w-[18px] mr-2"
            alt="Daily Brief"
          />
          <span className="text-sm font-medium">Daily Brief</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <img
            src={searchIcon}
            className="absolute left-3 top-4 h-[22px] w-[22px]"
            alt="Search"
          />
          <input
            type="text"
            placeholder="Search in Project"
            className="bg-zinc-900 rounded-lg pl-10 pr-4 py-4 w-[650px] text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Project Details */}
        <div className="flex items-center bg-zinc-900 rounded-lg p-4">
          <img
            src={projectDetailsIcon}
            className="h-[18px] w-[18px] mr-2"
            alt="Project Details"
          />
          <span className="text-sm font-medium">Project Details</span>
        </div>

        {/* Team */}
        <div className="flex items-center bg-zinc-900 rounded-lg p-4">
          <img src={teamIcon} className="h-[18px] w-[18px] mr-2" alt="Team" />
          <span className="text-sm font-medium">Team</span>
        </div>

        {/* Profile Picture */}
        <div className="p-2">
          <img src={pfpIcon} className="h-12 w-12" alt="Profile" />
        </div>
      </div>
      {/*main content*/}
      <div className="flex h-[calc(100vh-80px)]">
        {/* left sidebar */}
        <div className="w-[275px] h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
          {/* Project Title */}
          <div className="flex items-center justify-between mb-4 bg-zinc-800 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg" />
              <span className="font-medium">{activeProject}</span>
            </div>
            <button className="p-1 hover:bg-zinc-700 rounded">⋮</button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {/*line before documentation*/}
            <div className="h-[1px] bg-[#1e1e1e] my-2"></div>
            {navItems.map((item, index) => (
              <div key={item.title} className="space-y-1">
                <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800">
                  <span className="w-5">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </button>
                {index === 1 && (
                  <div className="h-[1px] bg-[#1e1e1e] my-2"></div>
                )}
                {item.subitems?.map((subitem) => (
                  <button
                    key={subitem}
                    className="w-full flex items-center space-x-3 p-2 pl-10 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <span className="text-sm">{subitem}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
        {/* Progress Wrapper */}
        <div className="flex-1 px-4 overflow-y-auto">
          {/* Progress Updates Section */}
          <div className="bg-zinc-900 rounded-lg pr-2 pl-2 pt-3 pb-3 mr-8 h-[275px]">
            <h2 className="text-xl font-medium mb-4">Progress Updates</h2>
            {/* Content for progress updates will go here */}
          </div>
          {/* Progress Sections Container */}
          <div className="flex gap-4 mr-8 mt-4">
            {/* Your Progress */}
            <div className="flex-1 bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Your Progress</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-lg text-sm">
                  This Week
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {/* Add your progress content here */}
              </div>
            </div>

            {/* Team Progress */}
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Team Progress</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-lg text-sm">
                  This Week
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {/* Add team progress content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
