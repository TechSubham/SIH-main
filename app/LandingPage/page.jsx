"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GaugeChart from "../../public/gauge_example2.png"
import BarChart from "../../public/BarChart.jpg";
import Piechart from "../../public/PieChart.jpg"
import Logo from "../../public/logo.png"
import Link from "next/link";
import { BarChart3, ArrowUpRight, Database } from 'lucide-react'

const Page = () => {
  return (
    <div className="font-serif bg-white h-screen w-full overflow-hidden relative">
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
            src={Logo}
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
      <h1 className="text-2xl ml-2">Efficient Data Extraction</h1>
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
      </div>
    </div>
  );
};

export default Page;

