import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, GraduationCap, PlayCircle, Timer } from "lucide-react";

interface TrainingProgressOverviewProps {
    completedCount: number;
    totalCount: number;
    isCertified: boolean;
    trainingStatus: 'not_started' | 'in_progress' | 'completed';
}

export function TrainingProgressOverview({
    completedCount,
    totalCount,
    isCertified,
    trainingStatus,
}: TrainingProgressOverviewProps) {
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    const statusConfig = {
        not_started: { label: 'Not Started', variant: 'secondary' as const, icon: PlayCircle },
        in_progress: { label: 'In Progress', variant: 'default' as const, icon: Timer },
        completed: { label: 'Completed', variant: 'default' as const, icon: CheckCircle2 },
    };

    const { label, variant, icon: StatusIcon } = statusConfig[trainingStatus];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Training Status</CardTitle>
                    <StatusIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Badge variant={variant} className="capitalize">
                        {label}
                    </Badge>
                </CardContent>
            </Card>

            <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Core Modules Progress</CardTitle>
                    <span className="text-xs text-muted-foreground">{completedCount} / {totalCount} Modules</span>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{progressPercent}%</div>
                        <div className="text-xs text-muted-foreground">Certification Ready</div>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Certification</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isCertified ? "Certified" : "Pending"}</div>
                    <p className="text-xs text-muted-foreground">Requires 3 Phases Passed</p>
                </CardContent>
            </Card>
        </div>
    );
}
