


// "use client";
// import React, { useState, useEffect } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import Qubit_data from "../../data/dummy_email_data.json";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
//   DropdownMenuItem
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Plus_Jakarta_Sans } from 'next/font/google';
// const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

// const Page = () => {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [data, setData] = useState(Qubit_data);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     date: "",
//   });

//   const [editingId, setEditingId] = useState(null);
//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected()}
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "name",
//       header: "Source Name",
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//     },
//     {
//       accessorKey: "date",
//       header: "Date",
//     },
//     {
//       accessorKey: "mobile",
//       header: "Products Affected",
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => {
//         const rowData = row.original;
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-2 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => handleEdit(rowData)}>
//                 Edit
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("Qubit_data"));
//     if (storedData) {
//       setData(storedData);
//     }
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const newData = editingId
//       ? data.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item))
//       : [...data, { ...formData, id: Date.now() }];
//     setData(newData);
//     localStorage.setItem("Qubit_data", JSON.stringify(newData));
//     setFormData({ name: "", email: "", mobile: "", date: "" });
//     setIsFormOpen(false);
//     setEditingId(null);
//   };

//   const handleEdit = (rowData) => {
//     setFormData(rowData);
//     setEditingId(rowData.id);
//     setIsFormOpen(true);
//   };

//   return (
//     <div className={`${plusJakartaSans.className} h-full bg-slate-200 lg:pl-4 lg:pr-4 lg:mt-2 mt-3`}>
//       <div className={`grid gap-4 ${isFormOpen ? "opacity-50 pointer-events-none" : ""}`}>
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <Input
//             placeholder="Filter emails"
//             value={table.getColumn("email")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("email")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//           <div className="flex gap-2">
//             <Button onClick={() => setIsFormOpen(true)} className="whitespace-nowrap">
//               <FontAwesomeIcon icon={faPlus} className="w-4 mr-2" />
//               Add
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="ml-auto">
//                   Columns
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {table
//                   .getAllColumns()
//                   .filter((column) => column.getCanHide())
//                   .map((column) => {
//                     return (
//                       <DropdownMenuCheckboxItem
//                         key={column.id}
//                         className="capitalize"
//                         checked={column.getIsVisible()}
//                         onCheckedChange={(value) =>
//                           column.toggleVisibility(!!value)
//                         }
//                       >
//                         {column.id}
//                       </DropdownMenuCheckboxItem>
//                     );
//                   })}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         <div className="border bg-white shadow-2xl rounded-3xl overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
//           <div className="overflow-x-auto h-full">
//             <div className="inline-block min-w-full align-middle">
//               <div className="overflow-hidden">
//                 <Table>
//                   <TableHeader>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                       <TableRow key={headerGroup.id}>
//                         {headerGroup.headers.map((header) => (
//                           <TableHead key={header.id} className="bg-blue-600 text-white sticky top-0 z-10">
//                             {header.isPlaceholder
//                               ? null
//                               : flexRender(
//                                   header.column.columnDef.header,
//                                   header.getContext()
//                                 )}
//                           </TableHead>
//                         ))}
//                       </TableRow>
//                     ))}
//                   </TableHeader>
//                   <TableBody>
//                     {table.getRowModel().rows?.length ? (
//                       table.getRowModel().rows.map((row) => (
//                         <TableRow
//                           key={row.id}
//                           data-state={row.getIsSelected() && "selected"}
//                         >
//                           {row.getVisibleCells().map((cell) => (
//                             <TableCell key={cell.id}>
//                               {flexRender(
//                                 cell.column.columnDef.cell,
//                                 cell.getContext()
//                               )}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell
//                           colSpan={columns.length}
//                           className="h-24 text-center"
//                         >
//                           No results.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-sm text-gray-500">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>

//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl">
//             <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//               {editingId ? "Edit User" : "Add User"}
//             </h2>
//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Source Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter source name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter email"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Affected
//                 </label>
//                 <input
//                   type="text"
//                   id="mobile"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter affected product"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleFormChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div className="flex justify-end space-x-4 mt-6">
//                 <Button
//                   type="button"
//                   onClick={() => {
//                     setIsFormOpen(false);
//                     setEditingId(null);
//                     setFormData({ name: "", email: "", mobile: "", date: "" });
//                   }}
//                   className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
//                 >
//                   {editingId ? "Update" : "Submit"}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;



"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Qubit_data from "../../data/dummy_email_data.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Plus_Jakarta_Sans } from 'next/font/google';
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

const Page = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState(Qubit_data);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All");

  const sourceNames = useMemo(() => {
    const names = ["All", ...new Set(data.map(item => item.name))];
    return names.sort();
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedSource === "All") return data;
    return data.filter(item => item.name === selectedSource);
  }, [data, selectedSource]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-full justify-start">
              Source Name <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sourceNames.map((name) => (
              <DropdownMenuItem
                key={name}
                onClick={() => setSelectedSource(name)}
              >
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "mobile",
      header: "Products Affected",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-2 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(rowData)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Qubit_data"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newData = editingId
      ? data.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item))
      : [...data, { ...formData, id: Date.now() }];
    setData(newData);
    localStorage.setItem("Qubit_data", JSON.stringify(newData));
    setFormData({ name: "", email: "", mobile: "", date: "" });
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleEdit = (rowData) => {
    setFormData(rowData);
    setEditingId(rowData.id);
    setIsFormOpen(true);
  };

  return (
    <div className={`${plusJakartaSans.className} h-full bg-slate-200 lg:pl-4 lg:pr-4 lg:mt-2 mt-3`}>
      <div className={`grid gap-4 ${isFormOpen ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Input
            placeholder="Filter emails"
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-2">
            <Button onClick={() => setIsFormOpen(true)} className="whitespace-nowrap">
              <FontAwesomeIcon icon={faPlus} className="w-4 mr-2" />
              Add
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="border bg-white shadow-2xl rounded-3xl overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <div className="overflow-x-auto h-full">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="bg-blue-600 text-white sticky top-0 z-10">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {editingId ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Source Name
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {formData.name || "Select a source"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Select a source</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sourceNames.filter(name => name !== "All").map((name) => (
                      <DropdownMenuItem
                        key={name}
                        onClick={() => setFormData({ ...formData, name })}
                      >
                        {name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        const newSource = prompt("Enter a new source name:");
                        if (newSource) setFormData({ ...formData, name: newSource });
                      }}
                    >
                      Add new source
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Affected
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter affected product"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingId(null);
                    setFormData({ name: "", email: "", mobile: "", date: "" });
                  }}
                  className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                  {editingId ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;