"use client";
import React from "react";
import { motion } from "framer-motion";
import PieChartDonut from "@/app/Components/PieChartDonut";
import LineChartGradinet from "@/app/Components/LineChartGradient";
import BarChartHorizontal from "@/app/Components/BarChartHorizontal";
import RadialChart from "@/app/Components/RadialChart";
import TableSourceVuln from "@/app/Components/TableSourceVuln";

const DashboardCards = () => {
  const vulnerabilityData = [
    {
      source: "Website A",
      vulnerabilitiesFound: 5,
      reportedVulnerabilities: 3,
    },
    { source: "API B", vulnerabilitiesFound: 2, reportedVulnerabilities: 1 },
    {
      source: "Website A",
      vulnerabilitiesFound: 5,
      reportedVulnerabilities: 3,
    },
    {
      source: "Website A",
      vulnerabilitiesFound: 5,
      reportedVulnerabilities: 3,
    },
    {
      source: "Website A",
      vulnerabilitiesFound: 5,
      reportedVulnerabilities: 3,
    },


    {
      source: "Website A",
      vulnerabilitiesFound: 5,
      reportedVulnerabilities: 3,
    },
    // ... more data ...
  ];
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
        <PieChartDonut />
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2 "
      >
        <LineChartGradinet />
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2 "
      >
        <BarChartHorizontal />
      </motion.div>
      {/* <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-4"
      ></motion.div> */}
      <motion.div
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-6 lg:row-span-4 h-full"
      >
        <TableSourceVuln data={vulnerabilityData} />
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-1 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-2"
      >
        <RadialChart />
      </motion.div>
    </motion.div>
  );
};

export default DashboardCards;
