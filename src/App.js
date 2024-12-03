import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import glanceLogo from "./img/Subtract.svg";
import newDocLogo from "./img/newDocLogo.svg";
import allDoc from "./img/folder.svg";
import searchIcon from "./img/searchIcon.svg";
import dgaoPfp from "./img/dgaoPfp.svg";
import josephinePfp from "./img/josephinePfp.svg";
import davidPfp from "./img/davidPfp.svg";
import jonPfp from "./img/jonPfp.svg";
import dgaoss from "./img/dgaoss.svg";
import josephiness from "./img/josephiness.svg";
import davidss from "./img/davidss.svg";
import jonss from "./img/jonss.svg";
import ellipse1 from "./img/ellipse1.svg";
import ellipse2 from "./img/ellipse2.svg";
import ellipse3 from "./img/ellipse3.svg";
import ellipse4 from "./img/ellipse4.svg";
import ellipse5 from "./img/ellipse5.svg";
import ellipse6 from "./img/ellipse6.svg";
import ProgressUpdatesCarousel from "./ProgressUpdatesCarousel";
import TimeFilterDropdown from "./TimeFilterDropdown";
import DailyBrief from "./DailyBrief";
import ProfilePicture from "./ProfilePicture";
import ProjectDetails from "./ProjectDetails";
import StartButton from "./StartButton";
import TeamSelector from "./TeamSelector";
import AllDocumentation from "./components/AllDocumentation";
import NewDocumentation from "./components/NewDocumentation";

function App() {
  const [activeProject] = useState("Blue Hour");
  const navItems = [
    {
      title: "New Documentation",
      icon: <img src={newDocLogo} alt="plus" />,
      path: "/new-documentation",
    },
    {
      title: "All Documentation",
      icon: <img src={allDoc} alt="folder" />,
      path: "/all-documentation",
    },
    {
      title: "Team Progress",
      icon: <img src={ellipse1} alt="folder" />,
      subitems: [
        "Compilation of Issues",
        "Timeline & Milestones",
        "Game Design Document",
      ],
    },
    {
      title: "3D Models",
      icon: <img src={ellipse2} alt="folder" />,
      subitems: ["Character Iterations", "Weapon Models", "Rigged Assets"],
    },
    {
      title: "Development",
      icon: <img src={ellipse3} alt="folder" />,
      subitems: ["Bugs", "Tech Stack", "Specification & Features"],
    },
    {
      title: "Marketing",
      icon: <img src={ellipse4} alt="folder" />,
      subitems: ["Successful Campaigns", "Resources"],
    },
    {
      title: "UI & UX",
      icon: <img src={ellipse5} alt="folder" />,
      subitems: ["Interface Iterations", "Final User Flow"],
    },
    {
      title: "Concept Art",
      icon: <img src={ellipse6} alt="folder" />,
      subitems: ["Character Art", "World Building", "Emote Templates"],
    },
  ];
  const updates = [
    {
      userName: "Daniel Gao",
      userAvatar: dgaoPfp,
      title: "Bugs Resolved",
      screenshot: dgaoss,
    },
    {
      userName: "Josephine Onggowarsito",
      userAvatar: josephinePfp,
      title: "Textured Weapon Model",
      screenshot: josephiness,
    },
    {
      userName: "David Han",
      userAvatar: davidPfp,
      title: "Fixed Frontend Flow",
      screenshot: davidss,
    },
    {
      userName: "Jon Powers",
      userAvatar: jonPfp,
      title: "Investor Meeting",
      screenshot: jonss,
    },
  ];

  const HomePage = () => (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 max-w-full">
        <ProgressUpdatesCarousel updates={updates} />
      </div>
      <div className="mt-4 flex-[3_3_0%] flex gap-4">
        <div className="flex-1 h-full">
          <div className="w-full h-full overflow-y-scroll bg-zinc-900 rounded-lg border-2 border-[#414344]">
            <div className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Your Progress</h2>
                <TimeFilterDropdown />
              </div>
            </div>
            <div className="min-h-0 p-8 pt-2">
              <div className="flex flex-col gap-6">
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
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-full overflow-y-auto bg-zinc-900 rounded-lg border-2 border-[#414344]">
            <div className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Team Progress</h2>
                <TimeFilterDropdown />
              </div>
            </div>
            <div className="min-h-0 p-8 pt-2">
              <div className="flex flex-col gap-4">
                <p className="leading-7 text-base text-zinc-300">
                  This week's focus was on{" "}
                  <span className="font-bold">
                    refining the core visual and gameplay elements
                  </span>{" "}
                  essential for the game's development.
                  <span className="bg-green-800 text-white px-1 mx-1 rounded">
                    High-resolution character and weapon models were finalized, with
                    textures and animations prepared for integration into the game
                    engine.
                  </span>
                  Environment assets, including terrain features and foliage, were
                  optimized to enhance the open-world experience while maintaining
                  performance.
                  <span className="bg-yellow-800 text-white px-1 mx-1 rounded">
                    Key gameplay systems, such as crafting and inventory mechanics,
                    underwent significant updates to improve player interaction and
                    functionality.
                  </span>
                  <span className="bg-blue-800 text-white px-1 mx-1 rounded">
                    Technical adjustments resolved critical bugs, ensuring smoother
                    terrain generation and stabilizing NPC behavior for better
                    immersion.
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

  return (
    <Router>
      <div className="flex gap-4 bg-black text-white h-screen w-screen overflow-hidden font-inter p-4">
        {/* Left Nav */}
        <div className="flex flex-col">
          <Link to={"/" || "#"} className="focus:outline-none h-20">
            <div className="flex items-center ml-4 mr-[130px] select-none">
              <img src={glanceLogo} className="h-9 w-7 mr-3" alt="Logo" />
              <h1 className="font-custom text-3xl">glance</h1>
            </div>
          </Link>

          <TeamSelector />

          {/* Navigation Items */}
          <nav className="space-y-1">
            {/*line before documentation*/}
            <div className="h-[1px] bg-[#1e1e1e] my-2"></div>
            {navItems.map((item, index) => (
              <div key={item.title} className="space-y-1">
                {item.subitems ? (
                  <Collapsible.Root className="w-full">
                    <Collapsible.Trigger className="w-full flex items-center justify-between py-2 pr-2 pl-6 rounded-lg hover:bg-zinc-800 group">
                      <div className="flex items-center space-x-3">
                        <span className="w-5">{item.icon}</span>
                        <span className="text-sm">{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 ease-in-out group-data-[state=open]:hidden" />
                      <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform duration-200 ease-in-out hidden group-data-[state=open]:block" />
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      {item.subitems.map((subitem) => (
                        <button
                          key={subitem}
                          className="w-full flex items-center space-x-3 p-2 pl-10 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                          <span className="text-sm">{subitem}</span>
                        </button>
                      ))}
                    </Collapsible.Content>
                  </Collapsible.Root>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className="w-full flex items-center space-x-3 py-2 pr-2 pl-6 rounded-lg hover:bg-zinc-800"
                  >
                    <span className="w-5">{item.icon}</span>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                )}
                {index === 1 && (
                  <div className="h-[1px] bg-[#1e1e1e] my-2"></div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col h-full w-full">
          <div className="flex  gap-4 h-14 mb-6">
            {/* Daily Brief */}
            <DailyBrief />

            {/* Search Bar */}
            <div className="relative h-full flex-1">
              <img
                src={searchIcon}
                className="absolute left-3 top-4 h-[22px] w-[22px]"
                alt="Search"
              />
              <input
                type="text"
                placeholder="Search in Project"
                className="bg-zinc-900 rounded-lg h-full w-full pl-10 pr-4 py-4 w-[650px] text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Project Details */}
            <ProjectDetails />

            {/* Play Button */}
            <StartButton />

            {/* Profile Picture */}
            <ProfilePicture />
          </div>
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-documentation" element={<AllDocumentation />} />
              <Route path="/new-documentation" element={<NewDocumentation />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
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
