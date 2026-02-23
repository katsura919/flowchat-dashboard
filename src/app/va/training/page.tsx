"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingProgressOverview } from "@/components/va/training/training-progress-overview";
import { ModuleRoadmap } from "@/components/va/training/module-roadmap";
import { CertificationDashboard } from "@/components/va/training/certification-dashboard";
import { useTrainingProgress, useUpdateModuleStatus, useCertification } from "@/hooks/training";
import { ChevronRight, Home, GraduationCap, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
    const { data: progress, isLoading: isProgressLoading } = useTrainingProgress();
    const { data: certification, isLoading: isCertLoading } = useCertification();
    const updateModule = useUpdateModuleStatus();

    const [activeTab, setActiveTab] = useState("modules");

    const toggleModule = (slug: string) => {
        if (!progress) return;

        const module = progress.modules.find(m => m.slug === slug);
        if (!module) return;

        updateModule.mutate({ slug, completed: !module.completed });
    };

    if (isProgressLoading || isCertLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading training progress...</p>
            </div>
        );
    }

    if (!progress) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
                <h2 className="text-xl font-semibold">No progress data found</h2>
                <p className="text-muted-foreground">Please contact your administrator if this is an error.</p>
            </div>
        );
    }

    const completedCount = progress.completedCount;
    const totalCount = progress.totalCount;
    const isCertified = progress.progressPercent === 100 && certification?.isCertified;

    const trainingStatus =
        completedCount === 0 ? 'not_started' :
            completedCount === totalCount ? 'completed' :
                'in_progress';

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 pt-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/va" className="hover:text-foreground flex items-center gap-1 transition-colors">
                    <Home className="h-3.5 w-3.5" />
                    VA
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">Training Progress</span>
            </nav>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Training Progress</h1>
                <p className="text-muted-foreground">
                    Track your journey through the FlowChat core modules and certification.
                </p>
            </div>

            {/* Progress Overview */}
            <TrainingProgressOverview
                completedCount={completedCount}
                totalCount={totalCount}
                isCertified={!!isCertified}
                trainingStatus={trainingStatus}
            />

            {/* Main Content Tabs */}
            <Tabs defaultValue="modules" className="w-full" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between border-b pb-2 mb-6">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                        <TabsTrigger
                            value="modules"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Core Modules
                            </div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="certification"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                Certification
                            </div>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="modules" className="border-none p-0 outline-none">
                    <ModuleRoadmap modules={progress.modules} onToggleComplete={toggleModule} />
                </TabsContent>

                <TabsContent value="certification" className="border-none p-0 outline-none">
                    {certification ? (
                        <CertificationDashboard certification={certification} />
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            Certification data not available.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
