import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import glanceLogo from "./img/Subtract.svg";
import newDocLogo from "./img/newDocLogo.svg";
import allDoc from "./img/folder.svg";
import searchIcon from "./img/searchIcon.svg";
import dgaoPfp from "./img/dgaoPfp.svg"; // Default avatar
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
import AuthContext from "./context/AuthContext"; // Import AuthContext
import { fetchScreenshots } from "./api"; // Fetch screenshots from backend

function App() {
  const { user, logout } = useContext(AuthContext); // Access AuthContext
  const [updates, setUpdates] = useState([]);

  // Fetch screenshots on mount
  useEffect(() => {
    const loadScreenshots = async () => {
      try {
        const screenshots = await fetchScreenshots();
        setUpdates(
          screenshots.map((screenshot) => ({
            userName: screenshot.username,
            userAvatar: dgaoPfp, // Temp avatar
            title: screenshot.description,
            screenshot: `http://localhost:5001/api/screenshots/image/${screenshot.fileId}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      }
    };
    if (user) loadScreenshots();
  }, [user]);

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
                {updates.map((update, index) => (
                  <ProgressItem
                    key={index}
                    date={new Date().toLocaleDateString()} // Replace with real date if available
                    description={update.title}
                  />
                ))}
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
      {user ? (
        <div className="flex gap-4 bg-black text-white h-screen w-screen overflow-hidden font-inter p-4">
          {/* Left Nav */}
          <div className="flex flex-col">
            <Link to="/" className="focus:outline-none h-20">
              <div className="flex items-center ml-4 mr-[130px] select-none">
                <img src={glanceLogo} className="h-9 w-7 mr-3" alt="Logo" />
                <h1 className="font-custom text-3xl">glance</h1>
              </div>
            </Link>

            <TeamSelector />

            {/* Navigation Items */}
            <nav className="space-y-1">
              <div className="h-[1px] bg-[#1e1e1e] my-2"></div>
              <div className="flex items-center p-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col h-full w-full">
            <div className="flex gap-4 h-14 mb-6">
              <DailyBrief />
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
              <ProjectDetails />
              <StartButton />
            </div>
            <div className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/all-documentation" element={<AllDocumentation />} />
                <Route path="/new-documentation" element={<NewDocumentation />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
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
