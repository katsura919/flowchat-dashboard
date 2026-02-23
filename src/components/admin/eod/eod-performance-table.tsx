"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { type DateRange } from "react-day-picker";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { format } from "date-fns";

interface EodPerformanceTableProps {
  data: any[];
  isLoading: boolean;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onViewDetails: (report: any) => void;
  // Controlled filter props
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (s: string) => void;
}

function SortIcon({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  if (isSorted === "asc")
    return <ChevronUp className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  if (isSorted === "desc")
    return <ChevronDown className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  return (
    <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
  );
}

const getHealthColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400";
    case "warning":
      return "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400";
    case "blocked":
      return "bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400";
    default:
      return "";
  }
};

export function EodPerformanceTable({
  data,
  isLoading,
  pagination,
  onPageChange,
  onViewDetails,
  dateRange,
  onDateRangeChange,
  searchQuery = "",
  onSearchQueryChange,
  statusFilter = "all",
  onStatusFilterChange,
}: EodPerformanceTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      accessorKey: "date",
      header: ({ column }) => (
        <button
          className="flex items-center font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {format(new Date(row.original.date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      id: "virtualAssistant",
      accessorFn: (row) => row.vaDetails?.name ?? "",
      header: ({ column }) => (
        <button
          className="flex items-center font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Virtual Assistant <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium leading-none">
            {row.original.vaDetails?.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.vaDetails?.email}
          </span>
        </div>
      ),
    },
    {
      id: "leads",
      accessorFn: (row) => row.dailyNumbers?.newLeadsImported ?? 0,
      header: ({ column }) => (
        <button
          className="flex items-center justify-end w-full font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Leads <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="font-mono text-sm block text-right">
          {getValue() as number}
        </span>
      ),
    },
    {
      id: "convos",
      accessorFn: (row) => row.dailyNumbers?.newConversationsStarted ?? 0,
      header: ({ column }) => (
        <button
          className="flex items-center justify-end w-full font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Convos <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="font-mono text-sm block text-right">
          {getValue() as number}
        </span>
      ),
    },
    {
      id: "booked",
      accessorFn: (row) => row.dailyNumbers?.callsBooked ?? 0,
      header: ({ column }) => (
        <button
          className="flex items-center justify-end w-full font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booked <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="font-mono text-sm font-bold text-primary block text-right">
          {getValue() as number}
        </span>
      ),
    },
    {
      id: "health",
      accessorFn: (row) => row.accountHealth?.status ?? "",
      header: ({ column }) => (
        <button
          className="flex items-center font-semibold text-foreground hover:text-foreground/80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Health <SortIcon isSorted={column.getIsSorted()} />
        </button>
      ),
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge variant="outline" className={getHealthColor(status)}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => null,
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => onViewDetails(row.original)}
          >
            <Eye className="h-3.5 w-3.5" />
            Audit
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 flex-1 min-w-[160px]" />
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-24 ml-auto" />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {[
                "",
                "Date",
                "Virtual Assistant",
                "Leads",
                "Convos",
                "Booked",
                "Health",
                "",
              ].map((h, i) => (
                <TableHead
                  key={i}
                  className={i === 0 ? "pl-6 w-10" : i === 7 ? "pr-6" : ""}
                >
                  {h && <Skeleton className="h-4 w-16" />}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-6 w-10">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>
                <TableCell className="pr-6">
                  <Skeleton className="h-8 w-16 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-6 py-3 border-t">
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
        <div className="relative flex-1 min-w-[160px]">
          <Input
            placeholder="Search by VA name or email..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            className="pl-9 h-9 text-sm bg-background/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-36 h-9 text-sm bg-background/50">
            <SelectValue placeholder="Health Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 text-sm h-9">
              Columns <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DatePickerWithRange
          date={dateRange}
          onDateChange={onDateRangeChange}
          className="w-auto"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/40 hover:bg-muted/40"
            >
              {headerGroup.headers.map((header, idx) => (
                <TableHead
                  key={header.id}
                  className={
                    idx === 0
                      ? "pl-6 w-10 py-3"
                      : idx === headerGroup.headers.length - 1
                        ? "pr-6 py-3"
                        : "py-3"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                No reports found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell
                    key={cell.id}
                    className={
                      idx === 0
                        ? "pl-6 py-3 w-10"
                        : idx === row.getVisibleCells().length - 1
                          ? "pr-6 py-3"
                          : "py-3"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t">
        <p className="text-sm text-muted-foreground">
          {selectedCount} of {totalCount} row(s) selected.
        </p>
        {pagination.totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
