"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
    Users,
    UserPlus,
    MessageCircle,
    Phone,
    Target,
    AlertCircle,
    Lightbulb,
    ShieldCheck,
    Calendar,
    User
} from "lucide-react";

export function EodDetailsDialog({ report, isOpen, onClose }: { report: any, isOpen: boolean, onClose: () => void }) {
    if (!report) return null;

    const va = report.vaDetails || {};

    const getHealthColor = (status: string) => {
        switch (status) {
            case "healthy": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "warning": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            case "blocked": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-card/95 backdrop-blur-md border-none shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                Daily Report Audit
                                <Badge variant="outline" className={getHealthColor(report.accountHealth.status)}>
                                    {report.accountHealth.status.toUpperCase()}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="mt-1 flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5" />
                                    {va.name} ({va.email})
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {format(new Date(report.date), "MMMM d, yyyy")}
                                </span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="p-6 pt-4 h-full max-h-[calc(90vh-140px)]">
                    <div className="space-y-8">
                        {/* Daily Numbers */}
                        <section>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
                                <Target className="h-4 w-4" />
                                Daily Performance Numbers
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">New Leads</p>
                                    <p className="text-lg font-bold">{report.dailyNumbers.newLeadsImported}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Friend Requests</p>
                                    <p className="text-lg font-bold">{report.dailyNumbers.friendRequestsSent}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Conversations</p>
                                    <p className="text-lg font-bold">{report.dailyNumbers.newConversationsStarted}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Calls Booked</p>
                                    <p className="text-lg font-bold text-primary">{report.dailyNumbers.callsBooked}</p>
                                </div>
                            </div>
                        </section>

                        <Separator className="bg-muted/30" />

                        {/* Qualitative Context */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                                    Account Insights
                                </h3>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Top Group</p>
                                    <p className="text-sm text-foreground bg-muted/20 p-2 rounded">{report.insights.topGroup || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Common Objection</p>
                                    <p className="text-sm text-foreground bg-muted/20 p-2 rounded">{report.insights.commonObjection || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Winning Hook</p>
                                    <p className="text-sm italic text-foreground bg-primary/5 p-2 border-l-2 border-primary rounded-r">
                                        "{report.insights.winningHook || "N/A"}"
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                    Warnings & Blockers
                                </h3>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Health Comments</p>
                                    <p className="text-sm text-foreground">{report.accountHealth.warnings || "No warnings reported."}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Action Taken</p>
                                    <p className="text-sm text-foreground">{report.accountHealth.actionTaken || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-red-500 uppercase mb-1 font-mono">Critical Blockers</p>
                                    <div className="text-sm bg-red-500/5 p-3 border border-red-500/10 rounded-md text-red-700 dark:text-red-400">
                                        {report.blockers || "None."}
                                    </div>
                                </div>
                            </section>
                        </div>

                        <Separator className="bg-muted/30" />

                        {/* Recommendations */}
                        <section className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2 mb-2">
                                <ShieldCheck className="h-4 w-4" />
                                VA Recommendations
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {report.insights.recommendations || "No recommendations provided for this shift."}
                            </p>
                        </section>

                        <div className="text-[10px] text-muted-foreground text-center">
                            Report submitted at {format(new Date(report.submittedAt), "PPP p")} (UTC)
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
