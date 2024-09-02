"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import Image from "next/image";
import add from "../../public/download.png";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const getFirstName = () => {
    if (user && user.displayName) {
      const names = user.displayName.split(" ");
      return names[0];
    }
    return "User";
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <motion.nav
        className="bg-white shadow-md p-4 flex items-center justify-between relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-green-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18m9-9H3"
              />
            </svg>
            <span className="text-gray-800 font-medium text-lg">LOGO</span>
          </div>
        </div>

        <div className="flex-grow mx-8 hidden md:block">
          <div className="relative w-full lg:w-[65%] lg:ml-52">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.2-4.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search"
              className="pl-10 w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-black"
            />
          </div>
        </div>

        <div className="relative flex items-center space-x-4">
          <motion.button
            className="focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold">
              {user ? getFirstName().charAt(0).toUpperCase() : "U"}
            </div>
          </motion.button>
          {isDropdownOpen && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative px-4 py-4 text-center bg-gray-100 border-b border-gray-300">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>

                <div className="text-sm mt-2 font-semibold text-gray-700">
                  {user?.email || "Email not available"}
                </div>
                <div className="flex items-center justify-center mt-3">
                  <motion.div
                    className="rounded-full bg-blue-500 w-20 h-20 flex items-center justify-center text-3xl text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {user?.displayName?.charAt(0).toUpperCase() || "U"}
                  </motion.div>
                </div>
                <div className="text-lg font-semibold text-gray-700 mt-3">
                  {user?.displayName || "User"}
                </div>
              </div>
              <div className="px-4 py-2">
                <motion.button
                  className="w-full px-4 py-2 mt-1 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center"
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <motion.div
        className="bg-gray-200 flex items-center justify-center py-8 h-64 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-36 w-36 hover:scale-105 transform transition-transform duration-300 bg-white flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Image src={add} alt="New Spreadsheet" />
          </motion.div>
          <div className="text-center text-black mt-4">New Spreadsheet</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
