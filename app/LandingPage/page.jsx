"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GaugeChart from "../../public/gauge_example2.png"
import BarChart from "../../public/BarChart.jpg";
import Piechart from "../../public/PieChart.jpg"
import Logo from "../../public/logo.png"
import Link from "next/link";

const Page = () => {
  return (
    <div className="font-serif bg-white h-screen w-full overflow-hidden relative">
      <div className="absolute inset-0">
        <motion.div 
          className="bg-gray-200 w-64 h-64 rounded-3xl rotate-45 relative bottom-48 right-20 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.div>
        <motion.div 
          className="bg-blue-600 w-[95%] h-[80%] relative rotate-45 bottom-[85%] rounded-3xl left-[15%] shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        </motion.div>
        <motion.div 
          className="w-[30%] h-[30%] relative bottom-[135%] -rotate-45 left-[40.5%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        ></motion.div>
        <motion.div 
          className="w-[70%] h-[30%] rounded-3xl relative bottom-[165%] -rotate-45 left-[48.9%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
        <motion.div
          className="bg-white w-52 h-52 relative bottom-[162%] left-[45%] -rotate-45 border rounded-3xl shadow-2xl z-10"
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
          className="bg-white w-52 h-52 relative bottom-[160%] left-[60%] -rotate-45 border rounded-3xl shadow-2xl z-20 "
          style={{ boxShadow: "10 40px 10px 0 rgba(255, 255, 255, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Image 
            src={Logo}
            className=" h-64 w-64 relative bottom-6"
            alt="Logo"
          />
        </motion.div>
        <motion.div
          className="bg-white w-52 h-52 relative bottom-[220%] left-[70%] -rotate-45 border rounded-3xl shadow-2xl z-30"
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
          className="bg-white w-52 h-52 relative bottom-[210%] left-[82%] -rotate-45 border rounded-3xl shadow-2xl z-40"
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
          className="bg-white relative bottom-[255%] w-[30%] ml-24 h-[50%] space-y-5"
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
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            this is team qubit here and we are working on a webscraping project
          </motion.div>

          <motion.div 
            className="relative w-[90%] h-16 ml-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            <input
              type="text"
              className="w-full h-12 pl-4 pr-32 rounded-full border border-blue-100 bg-gray-100"
              placeholder="Enter your email"
            />
            <Link href="/SignUp">
            <motion.button 
              className="absolute top-0 right-0 h-12 bg-blue-600 text-white px-6 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
              Start Trial
            </motion.button>
              </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative bottom-[245%] border w-[25%] h-24 ml-20 bg-gray-100 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          Details to be filled
        </motion.div>
        <motion.div 
          className="relative bottom-[257%] border w-[25%] h-24 ml-[35%] bg-gray-100 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          Details to be filled
        </motion.div>
        <motion.div 
          className="relative bottom-[269%] border w-[25%] h-24 ml-[65%] bg-gray-100 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          Details to be filled
        </motion.div>
        <motion.div 
          className="w-[70%] h-[30%] rounded-3xl relative bottom-[359%] -rotate-45 left-[64.5%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
        ></motion.div>
        <motion.div 
          className="w-[70%] h-[30%] relative bottom-[395%] rotate-45 left-[30.3%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        ></motion.div>
        <motion.div 
          className="w-[70%] h-[30%] relative bottom-[415%] rotate-45 left-[65.3%] bg-black bg-opacity-10 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Page;