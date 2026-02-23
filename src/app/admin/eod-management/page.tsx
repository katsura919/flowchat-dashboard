"use client";

import * as React from "react";
import { useAdminEodReports, useAdminEodSummary } from "@/hooks/admin-eod";
import { DateRange } from "react-day-picker";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { AdminEodStatsOverview } from "@/components/admin/eod/eod-stats-overview";
import { EodPerformanceTable } from "@/components/admin/eod/eod-performance-table";
import { EodDetailsDialog } from "@/components/admin/eod/eod-details-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw, BarChart3 } from "lucide-react";
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
  const filters = React.useMemo(
    () => ({
      startDate: dateRange?.from
        ? startOfDay(dateRange.from).toISOString()
        : undefined,
      endDate: dateRange?.to ? endOfDay(dateRange.to).toISOString() : undefined,
      search: searchQuery || undefined,
      status: statusFilter === "all" ? undefined : statusFilter,
      page,
      limit: 10,
    }),
    [dateRange, searchQuery, statusFilter, page],
  );

  // Fetch data
  const {
    data: reportsResponse,
    isLoading: isReportsLoading,
    refetch: refetchReports,
  } = useAdminEodReports(filters);

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useAdminEodSummary({
    startDate: filters.startDate,
    endDate: filters.endDate,
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

  const totalReports = reportsResponse?.pagination?.total ?? 0;

  return (
    <div className="space-y-6">

      {/* Aggregated Stats */}
      <AdminEodStatsOverview
        summary={summaryData}
        isLoading={isSummaryLoading}
      />

      {/* Performance Table */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              EOD Reports
            </CardTitle>
          </div>
          {!isReportsLoading && (
            <Badge variant="secondary" className="font-mono tabular-nums">
              {totalReports} {totalReports === 1 ? "report" : "reports"}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <EodPerformanceTable
            data={reportsResponse?.data || []}
            isLoading={isReportsLoading}
            pagination={
              reportsResponse?.pagination || {
                page: 1,
                totalPages: 1,
                total: 0,
              }
            }
            onPageChange={setPage}
            onViewDetails={handleViewDetails}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </CardContent>
      </Card>

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
