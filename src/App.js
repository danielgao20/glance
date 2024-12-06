import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import glanceLogo from "./img/Subtract.svg";
import newDocLogo from "./img/newDocLogo.svg";
import allDoc from "./img/folder.svg";
import searchIcon from "./img/searchIcon.svg";
import dgaoPfp from "./img/dgaoPfp.svg";
import ProgressUpdatesCarousel from "./ProgressUpdatesCarousel";
import TimeFilterDropdown from "./TimeFilterDropdown";
import DailyBrief from "./DailyBrief";
import ProjectDetails from "./ProjectDetails";
import StartButton from "./components/StartButton";
import TeamSelector from "./TeamSelector";
import AllDocumentation from "./components/AllDocumentation";
import NewDocumentation from "./components/NewDocumentation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./context/AuthContext";
import { fetchScreenshots } from "./api";
import ellipse1 from "./img/ellipse1.svg";
import ellipse2 from "./img/ellipse2.svg";
import ellipse3 from "./img/ellipse3.svg";
import ellipse4 from "./img/ellipse4.svg";
import ellipse5 from "./img/ellipse5.svg";
import ellipse6 from "./img/ellipse6.svg";
import ProfilePicture from "./components/ProfilePicture";

function App() {
  const { user, logout } = useContext(AuthContext);
  const [updates, setUpdates] = useState([]);

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

  useEffect(() => {
    const loadScreenshots = async () => {
      if (user) {
        try {
          const screenshots = await fetchScreenshots();
          setUpdates(
            screenshots.map((screenshot) => ({
              userName: screenshot.username,
              userAvatar: dgaoPfp,
              title: screenshot.description,
              screenshot: `http://localhost:5001/api/screenshots/image/${screenshot.fileId}`,
            }))
          );
        } catch (error) {
          console.error("Error fetching screenshots:", error);
        }
      }
    };
    loadScreenshots();
  }, [user]);

  const HomePage = () => (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 max-w-full overflow-hidden">
        <ProgressUpdatesCarousel updates={updates} />
      </div>
      <div className="mt-4 flex-[3_3_0%] flex gap-4 min-h-0">
        <div className="flex-1 h-full min-w-0">
          <div className="w-full h-[calc(50vh)] flex flex-col bg-zinc-900 rounded-lg border-2 border-[#414344] overflow-hidden">
            <div className="p-8 pb-4 flex-shrink-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Your Progress</h2>
                <TimeFilterDropdown />
              </div>
            </div>
            <div className="flex-1 scrollbar-hide overflow-y-auto overflow-x-hidden p-8 pt-2">
              <div className="flex flex-col gap-6">
                {updates.map((update, index) => (
                  <ProgressItem
                    key={index}
                    date={new Date().toLocaleDateString()}
                    description={update.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="w-full h-[calc(50vh)] flex flex-col bg-zinc-900 rounded-lg border-2 border-[#414344] overflow-hidden">
            <div className="p-8 pb-4 flex-shrink-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Team Progress</h2>
                <TimeFilterDropdown />
              </div>
            </div>
            <div className="flex-1 scrollbar-hide overflow-y-auto overflow-x-hidden p-8 pt-2">
              <div className="flex flex-col gap-4">
                <p className="leading-7 text-base text-zinc-300">
                  This week's focus was on{" "}
                  <span className="font-bold">key gameplay elements</span> to
                  enhance the project.
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
      {user ? ( // Conditionally render based on user authentication
        <div className="flex gap-4 bg-black text-white h-screen w-screen overflow-hidden font-inter p-4">
          {/* Left Nav */}
          <div className="flex flex-col flex-shrink-0">
            <Link to="/" className="focus:outline-none h-20">
              <div className="flex items-center ml-6 mr-[130px] select-none">
                <img src={glanceLogo} className="h-9 w-7 mr-3" alt="Logo" />
                <h1 className="font-custom text-3xl">glance</h1>
              </div>
            </Link>

            <TeamSelector />

            {/* Navigation Items */}
            <nav className="space-y-1 h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
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
          <div className="flex-1 flex flex-col h-full min-w-0">
            <div className="flex gap-4 h-14 mb-6 flex-shrink-0">
              <DailyBrief className="flex-shrink-0" />
              <div className="relative h-full flex-1 min-w-0">
                <img
                  src={searchIcon}
                  className="absolute left-3 top-4 h-[22px] w-[22px]"
                  alt="Search"
                />
                <input
                  type="text"
                  placeholder="Search in Project"
                  className="bg-zinc-900 rounded-lg h-full w-full pl-10 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <ProjectDetails className="flex-shrink-0" />
              <StartButton className="flex-shrink-0" />
              <ProfilePicture className="flex-shrink-0" />
            </div>
            <div className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/all-documentation"
                  element={<AllDocumentation />}
                />
                <Route
                  path="/new-documentation"
                  element={<NewDocumentation />}
                />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        // Render login/register when no user is authenticated
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} /> {/* Redirect to login */}
        </Routes>
      )}
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
