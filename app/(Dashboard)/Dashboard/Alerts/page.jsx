/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuSeparator,
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
import { auth } from "@/lib/firebaseConfig";

const Page = () => {
  const [sorting, setSorting] = useState([]);
  const [user, setUser] = useState(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All");
  const all = new Set(["All"]);
  const [data, setData] = useState({ emails: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sourceNames, setSourceNames] = useState([
    "All",
    "QNAP Systems, Inc",
    "IBM",
    "WordFence",
    "Microsoft",
  ]);

  const filteredData = useMemo(() => {
    if (selectedSource === "All") return data?.emails;
    return data?.emails.filter((item) => item.source === selectedSource);
  }, [data, selectedSource]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();
      setProducts(result);
      result.map((product) => all.add(product.source));
      setSourceNames([...all]);
      console.log("Products fetched:", [...all]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchAllSources = async () => {
    try {
      const response = await fetch("/api/sources");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  useEffect(() => {
    fetchAllSources();
  }, []);

  const addEmail = async () => {
    try {
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          source: formData.name,
          products: selectedProducts,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Email and products added successfully");
        fetchProducts();
        fetchAllSources();
      }
    } catch (error) {
      console.error("Error adding email and products:", error);
    }
  };

  const deleteEmail = async (emailToDelete, sourceName) => {
    try {
      const response = await fetch("/api/sources", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, source: sourceName }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Email deleted successfully");
        fetchAllSources();
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

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

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addEmail();
    setFormData({ name: "", email: "" });
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleEdit = (rowData) => {
    setFormData({ name: rowData.name, email: rowData.email });
    setEditingId(rowData.id);
    setIsFormOpen(true);
  };

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
      accessorKey: "source",
      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-fit justify-start">
              Source Name <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sourceNames?.map((name) => (
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
      cell: ({ row }) => {
        return (
          <div>
            <p>{row.getValue("email")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => {
        const rowProducts = row.original.products || [];
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                View Products <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {rowProducts.map((product, index) => (
                <DropdownMenuItem key={index}>{product}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
              <DropdownMenuItem
                onClick={() => deleteEmail(rowData.email, rowData.source)}
              >
                Delete
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

  return (
    <div className={`h-full`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div
            className={`grid h-fit bg-white p-8 gap-8 ${
              isFormOpen ? "opacity-50 pointer-events-none" : ""
            }`}
          >
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
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="whitespace-nowrap"
                >
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

            <div className="border bg-white shadow-2xl rounded-[0.75rem] overflow-hidden flex-1 h-full">
              <div className="h-full min-w-full flex flex-col">
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="bg-blue-600 text-white sticky top-0 z-10 px-4 py-2 text-left"
                            >
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
                              <TableCell
                                key={cell.id}
                                className="px-4 py-2 text-left"
                              >
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
                  {editingId ? "Edit Source" : "Add Source"}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Source Name
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {formData.name || "Select a source"}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>Select a source</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {products?.map((name) => (
                          <DropdownMenuItem
                            key={name.source}
                            onClick={() =>
                              setFormData({ ...formData, name: name.source })
                            }
                          >
                            {name.source}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Products
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          Select Products
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {products
                          .find((p) => p.source === formData.name)
                          ?.products.map((product, index) => (
                            <DropdownMenuCheckboxItem
                              key={index}
                              checked={selectedProducts.includes(product)}
                              onCheckedChange={(checked) => {
                                setSelectedProducts((prev) =>
                                  checked
                                    ? [...prev, product]
                                    : prev.filter((p) => p !== product)
                                );
                              }}
                            >
                              {product}
                            </DropdownMenuCheckboxItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        setIsFormOpen(false);
                        setEditingId(null);
                        setFormData({
                          name: "",
                          email: "",
                          mobile: "",
                          date: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingId ? "Update" : "Submit"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
