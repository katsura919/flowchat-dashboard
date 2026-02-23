import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, GraduationCap } from "lucide-react";
import { Certification, CertificationPhase } from "@/hooks/training";
import { cn } from "@/lib/utils";

interface CertificationDashboardProps {
    certification: Certification;
}

export function CertificationDashboard({ certification }: CertificationDashboardProps) {
    const phases = [
        { id: 'p1', title: 'Phase 1: Technical Mastery', data: certification.phase1 },
        { id: 'p2', title: 'Phase 2: Operational Safety', data: certification.phase2 },
        { id: 'p3', title: 'Phase 3: Client Communication', data: certification.phase3 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">VA Certification Journey</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        Your certification items are reviewed by your assigned Admin during weekly audits.
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {phases.map((phase) => (
                    <Card key={phase.id} className={cn(!phase.data.isPassed && phase.id !== 'p1' && "opacity-80")}>
                        <CardHeader className="pb-3 border-b bg-muted/30">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-bold">{phase.title}</CardTitle>
                                {phase.data.isPassed ? (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-success">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Passed
                                    </div>
                                ) : phase.id === 'p1' ? (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                                        Completed
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                                        In Progress
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 px-0">
                            <div className="divide-y">
                                {phase.data.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 py-3">
                                        <span className="text-sm text-foreground">{item.text}</span>
                                        <div className="flex items-center gap-2">
                                            {item.checked ? (
                                                <CheckCircle2 className="h-4 w-4 text-success" />
                                            ) : (
                                                <Circle className="h-4 w-4 text-muted-foreground/30" />
                                            )}
                                            <span className={cn(
                                                "text-[10px] uppercase font-bold tracking-wider",
                                                item.checked ? "text-success" : "text-muted-foreground"
                                            )}>
                                                {item.checked ? 'passed' : 'pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
