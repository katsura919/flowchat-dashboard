"use client";

import * as React from "react";
import { useAdminEodReports, useAdminEodSummary } from "@/hooks/admin-eod";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { AdminEodStatsOverview } from "@/components/admin/eod/eod-stats-overview";
import { EodPerformanceTable } from "@/components/admin/eod/eod-performance-table";
import { EodDetailsDialog } from "@/components/admin/eod/eod-details-dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminEodManagementPage() {
    // State for filters
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<string>("all");
    const [page, setPage] = React.useState(1);

    // State for report details
    const [selectedReport, setSelectedReport] = React.useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    // Prepare filter params for hooks
    const filters = React.useMemo(() => ({
        startDate: dateRange?.from ? startOfDay(dateRange.from).toISOString() : undefined,
        endDate: dateRange?.to ? endOfDay(dateRange.to).toISOString() : undefined,
        search: searchQuery || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
        page,
        limit: 10
    }), [dateRange, searchQuery, statusFilter, page]);

    // Fetch data
    const {
        data: reportsResponse,
        isLoading: isReportsLoading,
        refetch: refetchReports
    } = useAdminEodReports(filters);

    const {
        data: summaryData,
        isLoading: isSummaryLoading,
        refetch: refetchSummary
    } = useAdminEodSummary({
        startDate: filters.startDate,
        endDate: filters.endDate
    });

    const handleViewDetails = (report: any) => {
        setSelectedReport(report);
        setIsDetailsOpen(true);
    };

    const handleRefresh = () => {
        refetchReports();
        refetchSummary();
    };

    // Reset page when filters change
    React.useEffect(() => {
        setPage(1);
    }, [dateRange, searchQuery, statusFilter]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">EOD Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Track team-wide performance and audit daily VA reports.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Refresh Data
                </Button>
            </div>

            {/* Aggregated Stats */}
            <AdminEodStatsOverview summary={summaryData} isLoading={isSummaryLoading} />

            {/* Filter Bar */}
            <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Quick Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <DateRangePicker
                            date={dateRange}
                            onDateChange={setDateRange}
                        />
                    </div>
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by VA name or email..."
                            className="pl-9 bg-background/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="bg-background/50">
                                <SelectValue placeholder="Health Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Health Statuses</SelectItem>
                                <SelectItem value="healthy">Healthy Only</SelectItem>
                                <SelectItem value="warning">Warnings Only</SelectItem>
                                <SelectItem value="blocked">Blocked Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Performance Table */}
            <EodPerformanceTable
                data={reportsResponse?.data || []}
                isLoading={isReportsLoading}
                pagination={reportsResponse?.pagination || { page: 1, totalPages: 1, total: 0 }}
                onPageChange={setPage}
                onViewDetails={handleViewDetails}
            />

            {/* Audit Dialog */}
            <EodDetailsDialog
                report={selectedReport}
                isOpen={isDetailsOpen}
                onClose={() => {
                    setIsDetailsOpen(false);
                    setSelectedReport(null);
                }}
            />
        </div>
    );
}
