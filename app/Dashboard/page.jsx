"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
  faGear,
  faChartSimple,
  faMagnifyingGlass,
  faBell,
  faCircleExclamation,
  faPhone,
  faShieldHalved
} from "@fortawesome/free-solid-svg-icons";
import Qubit from "../../public/Qubit.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Overview from "../Overview/page.jsx";
import Vulnerability from "../Vulnerability/page.jsx";
import Alert from "../Alerts/page.jsx";
import { auth } from "../../firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

import { Plus_Jakarta_Sans } from 'next/font/google';
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });


const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Vulnerability />;
      case "vulnerability":
        return <Alert />;
      case "alert":
        return <Overview />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={`${plusJakartaSans.className} grid grid-cols-1 lg:grid-cols-[256px_1fr] h-full lg:h-screen bg-slate-200 rounded-lg overflow-hidden`}>
      <motion.div
        className={`fixed inset-y-0 left-0 transform lg:transform-none lg:static z-50 w-64 bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="lg:hidden flex justify-end p-2">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>
        <div className="relative bottom-4">
          <Image src={Qubit} className="w-28 h-28 text-purple-800" />
          <div className="font-extrabold text-2xl absolute top-10 left-24 text-blue-800">
            QUBIT
          </div>
        </div>

        <div className="mt-6 px-3">
          <div className="text-black font-semibold text-xl mb-4">Main</div>
          
          <ul className="space-y-4 ml-5">
          <li
              className={`flex items-center p-2 rounded-lg hover:cursor-pointer ${
                currentView === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setCurrentView("dashboard")}
            >
              <FontAwesomeIcon icon={faCircleExclamation} className="w-6 h-6 mr-3" />
              <span>Vulnerability</span>
            </li>
            <li
              className={`flex items-center p-2 rounded-lg hover:cursor-pointer ${
                currentView === "vulnerability"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setCurrentView("vulnerability")}
            >
              <FontAwesomeIcon icon={faShieldHalved} className="w-6 h-6 mr-3" />
              <span>Alerts</span>
            </li>
            {/* <li
              className={`flex items-center p-2 rounded-lg hover:cursor-pointer ${
                currentView === "alert"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setCurrentView("alert")}
            >
              <FontAwesomeIcon
                icon={faChartSimple}
                className="w-6 h-6 mr-3"
              />
              <span>Overview</span>
            </li> */}
          </ul>
        </div>

        <div className="mt-6 px-3">
          <div className="text-black font-semibold text-xl mb-4 border "></div>
          <ul className="space-y-3 ml-5">
            {/* <li className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-blue-500 hover:cursor-pointer hover:text-white">
              <FontAwesomeIcon icon={faGear} className="w-6 h-6 mr-3" />
              <span>Settings</span>
            </li> */}
            <li className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-blue-500 hover:cursor-pointer hover:text-white">
              <FontAwesomeIcon icon={faPhone} className="w-6 h-6 mr-3" />
              <span>Contact Us</span>
            </li>
          </ul>
        </div>
        <div className="px-3 mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="flex relative  bottom-5 items-center justify-center w-full p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-8 h-8 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-rows-[auto_1fr] lg:ml-0">
        <div className="bg-white p-4 h-16 flex justify-between items-center space-x-5">
          <button
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
          <div className="font-extrabold text-xl">
            {currentView === "dashboard"
              ? "OVERVIEW"
              : currentView === "vulnerability"
              ? "VULNERABILITIES"
              : "ALERTS"}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:relative lg:w-[65%] hidden lg:block "
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-5 h-5 text-gray-500"
              />
            </motion.div>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
              }}
              type="text"
              className="w-full p-2 pl-12 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              placeholder="Search..."
            />
          </motion.div>
          <div className="relative right-72 md:relative md:left-1">
            <FontAwesomeIcon
              icon={faBell}
              className="w-5 h-6 text-gray-500 hidden lg:block"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <div 
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {getInitial(user.name)}
                  </div>
                  <div className="hidden lg:block">
                    <span className="block text-sm font-semibold">
                      {user.name}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-auto p-3 pb-2 bg-white rounded-md shadow-lg py-1 z-10 lg:hidden"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-700 justify-center align-middle rounded-xl "
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <span className="text-sm">Not logged in</span>
            )}
          </div>
        </div>
        {renderView()}
      </div>
    </div>
  );
};

export default Page;