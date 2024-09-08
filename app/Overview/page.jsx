import React from "react";
import { motion } from "framer-motion";

const DashboardCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 gap-4 p-4 overflow-auto lg:grid-cols-4 lg:auto-rows-auto"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >
    
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >
     
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >

      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-4"
      >
   
      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-3 lg:row-span-3"
      >

      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-3"
      >

      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >

      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >

      </motion.div>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 text-black col-span-1 row-span-10 lg:col-span-1 lg:row-span-2"
      >

      </motion.div>
    </motion.div>
  );
};

export default DashboardCards;
