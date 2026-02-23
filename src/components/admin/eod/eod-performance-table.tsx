"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
}

export function EodPerformanceTable({
    data,
    isLoading,
    pagination,
    onPageChange,
    onViewDetails
}: EodPerformanceTableProps) {

    const getHealthColor = (status: string) => {
        switch (status) {
            case "healthy": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "warning": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            case "blocked": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "";
        }
    };

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-background/30 overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Virtual Assistant</TableHead>
                            <TableHead className="text-right">Leads</TableHead>
                            <TableHead className="text-right">Convos</TableHead>
                            <TableHead className="text-right">Booked</TableHead>
                            <TableHead>Health</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground italic">
                                    No reports found matching criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((report) => (
                                <TableRow key={report._id} className="hover:bg-muted/30 transition-colors group">
                                    <TableCell className="font-medium">
                                        {format(new Date(report.date), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{report.vaDetails?.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{report.vaDetails?.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {report.dailyNumbers.newLeadsImported}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {report.dailyNumbers.newConversationsStarted}
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-bold text-primary">
                                        {report.dailyNumbers.callsBooked}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getHealthColor(report.accountHealth.status)}>
                                            {report.accountHealth.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 hover:bg-primary hover:text-primary-foreground"
                                            onClick={() => onViewDetails(report)}
                                        >
                                            <Eye className="h-4 w-4" />
                                            Audit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {!isLoading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-muted-foreground">
                        Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total reports)
                    </p>
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
                </div>
            )}
        </div>
    );
}
