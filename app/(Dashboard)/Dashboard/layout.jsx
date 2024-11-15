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
  faShieldHalved,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Qubit from "@/public/Qubit.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

const Page = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
        });
      } else {
        setUser(null);
        router.replace("/Login");
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

  useEffect(() => {
    setCurrentView(pathname.slice(10));
  }, [pathname]);

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

  return (
    <div className={`flex h-screen bg-slate-200 rounded-lg overflow-hidden`}>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } absolute h-screen w-screen top-0 left-0 bg-black/40 z-40`}
      ></div>
      <motion.div
        className={`fixed inset-y-0 left-0 transform lg:transform-none lg:static z-50 min-w-full sm:min-w-64 bg-white flex flex-col transition-transform duration-300 ease-in-out ${
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
        <div className="relative bottom-4 flex justify-center items-center py-10 gap-1">
          <Image src={Qubit} className="w-14 h-14 text-purple-800" alt="" />
          <div className="font-extrabold text-2xl text-blue-800 pr-7">
            QUBIT
          </div>
        </div>

        <div className="mt-6 px-2">
          <ul className="space-y-4 font-semibold">
            <li
              className={`flex items-center p-3 rounded-[0.5rem] hover:cursor-pointer ${
                currentView === ""
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => router.push("/Dashboard")}
            >
              <FontAwesomeIcon icon={faChartSimple} className="w-6 h-6 mr-3" />
              <span>Overview</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-[0.5rem] hover:cursor-pointer ${
                currentView === "/Vulnerability"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => router.push("/Dashboard/Vulnerability")}
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="w-6 h-6 mr-3"
              />
              <span>Vulnerability</span>
            </li>
            <li
              className={`flex items-center p-3 rounded-[0.5rem] hover:cursor-pointer ${
                currentView === "/Alerts"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => router.push("/Dashboard/Alerts")}
            >
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="w-[22px] h-[22px] mr-3"
              />
              <span>Alerts</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 px-2">
          <ul className="space-y-3 font-semibold">
            {/* <li className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-blue-500 hover:cursor-pointer hover:text-white">
              <FontAwesomeIcon icon={faGear} className="w-6 h-6 mr-3" />
              <span>Settings</span>
            </li> */}
            <li
              className={`flex items-center p-3 rounded-[0.5rem] hover:cursor-pointer ${
                currentView === "/Contact"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => router.push("/Dashboard/Contact")}
            >
              <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3" />
              <span>Contact Us</span>
            </li>
          </ul>
        </div>
        <div className="px-3 mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="flex relative font-semibold bottom-5 items-center justify-between w-full py-3 px-5 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            <span>Logout</span>
            <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col lg:ml-0 flex-grow">
        <div className="bg-white p-4 h-16 flex justify-between items-center space-x-5">
          <button
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
          <div className="font-extrabold text-xl uppercase">
            {currentView === "" ? "Overview" : currentView.slice(1)}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:block flex-grow px-16 "
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative pointer-events-none z-50"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-4 h-4 text-gray-500 absolute top-3 left-4"
              />
            </motion.div>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileFocus={{
                scale: 1.0,
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
              }}
              type="text"
              className="w-full p-2 pl-12 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm"
              placeholder="Search..."
            />
          </motion.div>
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
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
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
        <div className="p-4 bg-slate-200 overflow-auto flex-1 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
