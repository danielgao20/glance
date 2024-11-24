import { useState } from "react";
import glanceLogo from "./img/Subtract.svg";
import dailyBriefIcon from "./img/dailyBriefIcon.svg";
import searchIcon from "./img/searchIcon.svg";
import projectDetailsIcon from "./img/projectDetailsIcon.svg";
import teamIcon from "./img/teamIcon.svg";
import pfpIcon from "./img/pfpIcon.svg";
import allDoc from "./img/folder.svg";
import dgaoPfp from "./img/dgaoPfp.svg";
import josephinePfp from "./img/josephinePfp.svg";
import davidPfp from "./img/davidPfp.svg";
import jonPfp from "./img/jonPfp.svg";
import dgaoss from "./img/dgaoss.svg";
import josephiness from "./img/josephiness.svg";
import davidss from "./img/davidss.svg";
import jonss from "./img/jonss.svg";
import VisualProgressUpdate from "./VisualProgressUpdate";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

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
        <div className="flex-1 px-4 overflow-y-scroll">
          {/* Progress Updates Section */}
          <div className="bg-zinc-900 rounded-lg p-6 mr-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Progress Updates</h2>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-zinc-800">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-zinc-800">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
              <VisualProgressUpdate
                userName="Daniel Gao"
                userAvatar={dgaoPfp}
                title="Bugs Resolved"
                screenshot={dgaoss}
              />
              <VisualProgressUpdate
                userName="Josephine Onggowarsito"
                userAvatar={josephinePfp}
                title="Textured Weapon Model"
                screenshot={josephiness}
              />
              <VisualProgressUpdate
                userName="David Han"
                userAvatar={davidPfp}
                title="Fixed Frontend Flow"
                screenshot={davidss}
              />
              <VisualProgressUpdate
                userName="Jon Powers"
                userAvatar={jonPfp}
                title="Investor Meeting"
                screenshot={jonss}
              />
            </div>
          </div>

          {/* Progress Sections Container */}
          <div className="flex gap-4 mr-8 mt-4 h-[600px]">
            {/* Your Progress */}
            <div className="flex-1 bg-zinc-900 rounded-lg p-6 overflow-y-scroll h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Your Progress</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-lg text-sm">
                  This Week
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                <ProgressItem
                  date="10 Nov, 2024"
                  description="Finalized high-poly sculpt for the character model, integrating feedback from the concept art team."
                />
                <ProgressItem
                  date="10 Nov, 2024"
                  description="Created and UV-mapped a weapon model (sword) for in-game use."
                />
                <ProgressItem
                  date="14 Nov, 2024"
                  description="Textured the weapon model using Substance Painter, focusing on realistic wear-and-tear details."
                />
                <ProgressItem
                  date="15 Nov, 2024"
                  description="Exported rigged character animation sequences (idle and walk cycle) for integration into the game engine."
                />
                <ProgressItem
                  date="18 Nov, 2024"
                  description="Reviewed and addressed comments on the tree & environmental variant assets from the UI/UX team."
                />
              </div>
            </div>

            {/* Team Progress */}
            <div className="flex-1 bg-zinc-900 rounded-lg p-8 overflow-y-scroll h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Team Progress</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-lg text-sm">
                  This Week
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="leading-7 text-base text-zinc-300">
                  This week’s focus was on{" "}
                  <span className="font-bold">
                    refining the core visual and gameplay elements
                  </span>{" "}
                  essential for the game’s development.
                  <span className="bg-green-800 text-white px-1 mx-1 rounded">
                    High-resolution character and weapon models were finalized,
                    with textures and animations prepared for integration into
                    the game engine.
                  </span>
                  Environment assets, including terrain features and foliage,
                  were optimized to enhance the open-world experience while
                  maintaining performance.
                  <span className="bg-yellow-800 text-white px-1 mx-1 rounded">
                    Key gameplay systems, such as crafting and inventory
                    mechanics, underwent significant updates to improve player
                    interaction and functionality.
                  </span>
                  <span className="bg-blue-800 text-white px-1 mx-1 rounded">
                    Technical adjustments resolved critical bugs, ensuring
                    smoother terrain generation and stabilizing NPC behavior for
                    better immersion.
                  </span>
                  These achievements lay a solid foundation as the project
                  progresses toward the{" "}
                  <span className="font-bold">
                    upcoming playable prototype milestone
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressItem({ date, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-zinc-300 whitespace-nowrap">
        {date}
      </div>
      <p className="text-base text-zinc-100 leading-relaxed">{description}</p>
    </div>
  );
}
export default App;
