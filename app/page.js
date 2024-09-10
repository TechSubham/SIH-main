"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GaugeChart from "../public/gauge_example2.png";
import BarChart from "../public/BarChart.jpg";
import Piechart from "../public/PieChart.jpg";
import Qubit from "../public/Qubit.png";
import Link from "next/link";
import { BarChart3, ArrowUpRight, Database, ArrowRight } from 'lucide-react';

const Page = () => {
  return (
    <>

      <div className="font-serif bg-white text-black h-screen w-full overflow-hidden relative hidden lg:block">
 
        <div className="absolute inset-0">
        <motion.div
          className="bg-gray-200 lg:w-64 lg:h-64 lg:rounded-3xl lg:rotate-45 lg:relative lg:bottom-48 lg:right-20 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.div>
        <motion.div
          className="bg-blue-600 lg:w-[95%] lg:h-[80%] lg:relative lg:rotate-45 lg:bottom-[85%] lg:rounded-3xl lg:left-[15%] shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        </motion.div>
        <motion.div
          className="lg:w-[30%] lg:h-[30%] lg:relative lg:bottom-[135%] lg:-rotate-45 lg:left-[40.5%] lg:bg-black lg:bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        ></motion.div>
        <motion.div
          className="lg:w-[70%] lg:h-[30%] lg:rounded-3xl lg:relative lg:bottom-[165%] lg:-rotate-45 lg:left-[48.9%] lg:bg-black lg:bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
        <motion.div
          className="lg:bg-white lg:block hidden lg:w-52 lg:h-52 lg:relative lg:bottom-[162%] lg:left-[45%] lg:-rotate-45 lg:border lg:rounded-3xl lg:shadow-2xl z-10"
          style={{ boxShadow: "10 40px 10px 0 rgba(255, 255, 255, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Image
            src={GaugeChart}
            className="w-full mt-7"
            alt="Gauge Chart"
          />
          <motion.button
            className="border ml-12 mt-4 border-blue-600 p-2 pl-4 pr-4 rounded-xl bg-blue-600 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Improve
          </motion.button>
        </motion.div>
        <motion.div
          className="bg-white lg:w-52 lg:h-52 lg:block hidden lg:relative lg:bottom-[160%] lg:left-[60%] lg:-rotate-45 border rounded-3xl shadow-2xl z-20 "
          style={{ boxShadow: "10 40px 10px 0 rgba(255, 255, 255, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Image
            src={Qubit}
            className=" h-64 w-64 relative bottom-6"
            alt="Logo"
          />
        </motion.div>
        <motion.div
          className="bg-white lg:w-52 lg:h-52 lg:relative lg:block hidden lg:bottom-[220%] lg:left-[70%] lg:-rotate-45 border rounded-3xl shadow-2xl z-30"
          style={{ boxShadow: "10 40px 10px 0 rgba(255, 255, 255, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Image
            src={BarChart}
            className="p-2"
            alt="Bar Chart"
          />
        </motion.div>
        <motion.div
          className="bg-white lg:w-52 lg:h-52 lg:relative lg:block hidden lg:bottom-[210%] lg:left-[82%] lg:-rotate-45 border rounded-3xl shadow-2xl z-40"
          style={{ boxShadow: "10 40px 10px 0 rgba(255, 255, 255, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Image
            src={Piechart}
            className="w-full mt-7"
            alt="Pie Chart"
          />
        </motion.div>

        <motion.div
          className="bg-white hidden lg:block lg:relative lg:bottom-[245%] lg:w-[30%] lg:ml-36 lg:h-[50%] lg:space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <motion.h1
            className="text-center font-extrabold text-7xl text-blue-950"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            Qubit
          </motion.h1>
          <motion.div
            className="text-center text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
             Revolutionizing web scraping with cutting-edge technology 
          </motion.div>

          <motion.div
            className="relative w-[90%] h-16 ml-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            {/* <input
              type="text"
              className="w-full h-12 pl-4 pr-32 rounded-full border border-blue-100 bg-gray-100"
              placeholder="Enter your email"
            /> */}
            <Link href="/SignUp">
            <motion.button
              className="relative left-32 top-0 right-0 h-12 bg-blue-600 text-white px-6 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
             Get Started
            </motion.button>
              </Link>
          </motion.div>
        </motion.div>

        <motion.div
        className="lg:relative   lg:bottom-[245%] border lg:w-[25%] lg:h-24 lg:ml-20 bg-gray-100 rounded-xl flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.4 }}
      >
        <ArrowUpRight className="w-12 h-12 text-blue-600" />
        <h1 className="text-2xl ml-2">Efficient Data Extraction</h1>
      
      </motion.div>
      <motion.div
        className="lg:relative  lg:bottom-[257%] border lg:w-[25%] lg:h-24 lg:ml-[35%] bg-gray-100 rounded-xl flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.6 }}
      >
        <BarChart3 className="w-12 h-12 text-green-600" />
      <h1 className="text-2xl ml-2">Advanced Analytics</h1>
      </motion.div>
      <motion.div
        className="lg:relative  lg:bottom-[269%] lg:border lg:w-[25%] lg:h-24 lg:ml-[65%] bg-gray-100 rounded-xl flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        <Database className="w-12 h-12 text-yellow-600" />
      <h1 className="text-2xl ml-2">Scalable Infrastructure</h1>
      </motion.div>
        <motion.div
          className="lg:w-[70%] lg:block hidden lg:h-[30%] rounded-3xl lg:relative lg:bottom-[359%] lg:-rotate-45 lg:left-[64.5%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
        ></motion.div>
        <motion.div
          className="lg:w-[70%] lg:h-[30%] lg:relative lg:bottom-[395%] lg:rotate-45 lg:left-[30.3%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        ></motion.div>
        <motion.div
          className="lg:w-[70%] lg:h-[30%] lg:relative lg:bottom-[415%] lg:rotate-45 lg:left-[65.3%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        ></motion.div>
          {/* ... (All the motion.div elements from the first code) ... */}
          {/* Make sure to include all the elements up to the last motion.div */}
        </div>
      </div>

      {/* Mobile View */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen sm:p-8 flex flex-col items-center justify-center relative overflow-hidden lg:hidden">
        {/* Background Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute w-[200%] h-[50%] bg-blue-200 opacity-30 rounded-[100%] top-[-25%] left-[-50%] transform rotate-[-15deg]"
            animate={{
              y: [0, 20, 0],
              rotate: [-15, -10, -15],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute w-[200%] h-[50%] bg-indigo-200 opacity-30 rounded-[100%] bottom-[-25%] right-[-50%] transform rotate-[15deg]"
            animate={{
              y: [0, -20, 0],
              rotate: [15, 10, 15],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full max-w-4xl sm:space-y-12 space-y-5 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="font-extrabold text-5xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Qubit
          </motion.h1>
          <motion.div
            className="text-gray-700 sm:text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing web scraping with cutting-edge technology 
          </motion.div>

          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/SignUp">
              <motion.button
                className="relative top-1 left-40 h-10 md:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 rounded-full text-base md:text-lg font-semibold flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 relative z-10">
          {[
            { icon: ArrowUpRight, title: "Efficient Data Extraction", description: "Extract data with unparalleled speed and accuracy" },
            { icon: BarChart3, title: "Advanced Analytics", description: "Gain insights with our powerful analytical tools" },
            { icon: Database, title: "Scalable Infrastructure", description: "Grow your data operations without limits" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-90 p-4 sm:p-5 rounded-xl flex flex-col items-center text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
            >
              <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mb-2 sm:mb-3" />
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{feature.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;


