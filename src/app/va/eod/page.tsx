"use client";

import { useState } from "react";
import { useEodReports } from "@/hooks/eod-reports";
import { ChevronRight, Home, FilePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { CertificationGate } from "@/components/va/eod/certification-gate";
import { EodForm } from "@/components/va/eod/eod-form";
import { EodHistoryTable } from "@/components/va/eod/eod-history-table";
import { EodStatsOverview } from "@/components/va/eod/eod-stats-overview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EodPage() {
  const { data: reports, isLoading, refetch } = useEodReports();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Loading EOD reports...
        </p>
      </div>
    );
  }

  const lastReport = reports && reports.length > 0 ? reports[0] : undefined;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/va"
          className="hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          VA
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground">EOD Reports</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EOD Reports</h1>
          <p className="text-muted-foreground mt-1">
            Submit your End of Day report and track your daily performance.
          </p>
        </div>

        <CertificationGate mode="button">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 self-start sm:self-auto">
                <FilePlus className="h-4 w-4" />
                Submit EOD Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
              <DialogHeader className="sr-only">
                <DialogTitle>Submit EOD Report</DialogTitle>
              </DialogHeader>
              <EodForm
                onSuccess={() => {
                  refetch();
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </CertificationGate>
      </div>

      {/* Stats Overview */}
      <EodStatsOverview lastReport={lastReport} />

      {/* History Table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Past Reports</h2>
        <EodHistoryTable reports={reports || []} />
      </div>
    </div>
  );
}
