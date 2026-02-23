"use client";

import { useCertification, useTrainingProgress } from "@/hooks/training";
import { Lock, GraduationCap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CertificationGateProps {
  children: React.ReactNode;
  /** "block" (default) shows full locked UI; "button" wraps the trigger with a disabled tooltip */
  mode?: "block" | "button";
}

export function CertificationGate({
  children,
  mode = "block",
}: CertificationGateProps) {
  const { data: certification, isLoading: isCertLoading } = useCertification();
  const { data: progress, isLoading: isProgressLoading } =
    useTrainingProgress();

  if (isCertLoading || isProgressLoading) {
    if (mode === "button") return <Skeleton className="h-9 w-44 rounded-md" />;
    return <Skeleton className="w-full h-[400px] rounded-xl" />;
  }

  const isCertified =
    progress?.progressPercent === 100 && certification?.isCertified;

  if (!isCertified) {
    if (mode === "button") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex self-start sm:self-auto">
                <Button
                  disabled
                  className="gap-2 pointer-events-none opacity-60"
                >
                  <Lock className="h-4 w-4" />
                  Submit EOD Report
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Complete your certification to submit reports.{" "}
              <Link href="/va/training" className="underline font-medium">
                View training
              </Link>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <div className="relative overflow-hidden rounded-xl border bg-card p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[500px]">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="relative space-y-2 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight">
            Certification Required
          </h2>
          <p className="text-muted-foreground text-lg">
            You must complete your 3-phase certification and all training
            modules before you can submit daily reports.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/va/training">
              <GraduationCap className="h-4 w-4" />
              View Training Progress
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-24 -left-24 h-64 w-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
    );
  }

  return <>{children}</>;
}
