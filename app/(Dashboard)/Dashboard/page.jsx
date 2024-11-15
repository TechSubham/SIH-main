"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import PieChartDonut from "@/app/Components/PieChartDonut";
import LineChartGradinet from "@/app/Components/LineChartGradient";
import BarChartHorizontal from "@/app/Components/BarChartHorizontal";
import RadialChart from "@/app/Components/RadialChart";
import TableSourceVuln from "@/app/Components/TableSourceVuln";

const DashboardCards = () => {
  const [analyticalData, setAnalyticalData] = useState(null);

  useEffect(() =>{
    fetch("/api/analytics").then((res) => res.json()).then((data) => setAnalyticalData(data));
  },[])


  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 gap-2 p-4 h-full overflow-auto lg:grid-cols-9 lg:auto-rows-auto"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2 "
      >
        <PieChartDonut data={analyticalData}/>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2 "
      >
        <LineChartGradinet data={analyticalData}/>
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2 "
      >
        <BarChartHorizontal data={analyticalData}/>
      </motion.div>
      <motion.div
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-6 lg:row-span-4 h-full"
      >
        <TableSourceVuln data={analyticalData?.sourceWiseVulnerability.sort((a, b) => b.vulnerabilitiesFound - a.vulnerabilitiesFound)} />
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2"
      >
        <RadialChart data={analyticalData?.sourceWiseVulnerability?.sort((a, b) => b.vulnerabilitiesFound - a.vulnerabilitiesFound)}/>
      </motion.div>
    </motion.div>
  );
};

export default DashboardCards;
