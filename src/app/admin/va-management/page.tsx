"use client";

import { useState } from "react";
import { useVAs } from "@/hooks/va-management";
import { DataTable } from "@/components/va-management/data-table";
import { columns } from "@/components/va-management/columns";
import { CreateVaDialog } from "@/components/va-management/create-va-dialog";

export default function VaManagementPage() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValue, setFilterValue] = useState<"all" | "my">("all");

    // Fetch VAs using the custom hook
    const { data: response, isLoading, isError } = useVAs({
        page,
        limit,
        search: searchQuery,
        filter: filterValue,
    });

    const vAs = response?.data || [];
    const totalPages = response?.metadata?.totalPages || 1;

    // Handle filter/search resets and changes
    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setPage(1); // Reset to first page when searching
    };

    const handleFilterChange = (val: "all" | "my") => {
        setFilterValue(val);
        setPage(1); // Reset to first page when filtering
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Virtual Assistants</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your team of VAs, track their training, and view certifications.
                    </p>
                </div>
                <CreateVaDialog />
            </div>

            {isError ? (
                <div className="rounded-md bg-destructive/15 p-4 text-destructive font-medium">
                    Failed to load Virtual Assistants. Please try again later.
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={vAs}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    filterValue={filterValue}
                    onFilterChange={handleFilterChange}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}
