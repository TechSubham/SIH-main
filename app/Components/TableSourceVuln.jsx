import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import { motion } from "framer-motion";

const VulnerabilityTable = ({ data = [] }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: "vulnerabilitiesFound",
    direction: "descending",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setTableData(sortedData);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = data.filter((item) =>
      item.source.toLowerCase().includes(term)
    );

    setTableData(filteredData);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Vulnerability Report
      </h2>
      <div className="mb-4">
        <Input
          placeholder="Search by source..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
          icon={<Search className="mr-2 h-4 w-4" />}
        />
      </div>
      <div className="overflow-x-auto overflow-y-scroll flex-grow max-h-52">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Source",
                "Vulnerabilities Found",
                "Reported Vulnerabilities",
              ].map((header) => (
                <TableHead key={header} className="bg-gray-100">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      sortData(header.toLowerCase().replace(" ", ""))
                    }
                    className="text-left font-bold text-gray-700 hover:text-gray-900"
                  >
                    {header}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{row.source}</TableCell>
                <TableCell>{row.vulnerabilitiesFound}</TableCell>
                <TableCell>{row.reportedVulnerabilities}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VulnerabilityTable;
