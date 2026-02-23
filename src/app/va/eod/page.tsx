"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEodReports } from "@/hooks/eod-reports";
import { ChevronRight, Home, ClipboardList, History, FilePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { CertificationGate } from "@/components/va/eod/certification-gate";
import { EodForm } from "@/components/va/eod/eod-form";
import { EodHistoryTable } from "@/components/va/eod/eod-history-table";
import { EodStatsOverview } from "@/components/va/eod/eod-stats-overview";

export default function EodPage() {
    const { data: reports, isLoading, refetch } = useEodReports();
    const [activeTab, setActiveTab] = useState("submit");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading EOD reports...</p>
            </div>
        );
    }

    const lastReport = reports && reports.length > 0 ? reports[0] : undefined;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 pt-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/va" className="hover:text-foreground flex items-center gap-1 transition-colors">
                    <Home className="h-3.5 w-3.5" />
                    VA
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">EOD Reports</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">EOD Reports</h1>
                    <p className="text-muted-foreground">
                        Submit your End of Day report and track your daily performance.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                    <History className="h-4 w-4" />
                    Last Submitted: {lastReport ? new Date(lastReport.date).toLocaleDateString() : "Never"}
                </div>
            </div>

            {/* Stats Overview */}
            <EodStatsOverview lastReport={lastReport} />

            {/* Main Content Tabs */}
            <Tabs defaultValue="submit" className="w-full" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between border-b pb-2 mb-6">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                        <TabsTrigger
                            value="submit"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <div className="flex items-center gap-2">
                                <FilePlus className="h-4 w-4" />
                                Submit Report
                            </div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-4 w-4" />
                                Past Reports
                            </div>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="submit" className="border-none p-0 outline-none space-y-6">
                    <CertificationGate>
                        <div className="max-w-3xl">
                            <EodForm onSuccess={() => {
                                refetch();
                                setActiveTab("history");
                            }} />
                        </div>
                    </CertificationGate>
                </TabsContent>

                <TabsContent value="history" className="border-none p-0 outline-none">
                    <EodHistoryTable reports={reports || []} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
