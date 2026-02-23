"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EodReport } from "@/hooks/eod-reports";
import { format } from "date-fns";
import { Eye, AlertCircle, CheckCircle2, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function EodHistoryTable({ reports }: { reports: EodReport[] }) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "healthy": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case "blocked": return <Ban className="h-4 w-4 text-red-500" />;
            default: return null;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "healthy": return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Healthy</Badge>;
            case "warning": return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Warning</Badge>;
            case "blocked": return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Blocked</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="rounded-xl border bg-card/60 backdrop-blur-md overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[150px]">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Leads</TableHead>
                        <TableHead className="text-right">Requests</TableHead>
                        <TableHead className="text-right">Convos</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                No reports submitted yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        reports.map((report) => (
                            <TableRow key={report._id} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="font-medium">
                                    {format(new Date(report.date), "MMM dd, yyyy")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(report.accountHealth.status)}
                                        {getStatusBadge(report.accountHealth.status)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{report.dailyNumbers.newLeadsImported}</TableCell>
                                <TableCell className="text-right">{report.dailyNumbers.friendRequestsSent}</TableCell>
                                <TableCell className="text-right">{report.dailyNumbers.newConversationsStarted}</TableCell>
                                <TableCell className="text-right font-bold text-primary">{report.dailyNumbers.callsBooked}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>EOD Report - {format(new Date(report.date), "MMMM dd, yyyy")}</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-primary mb-2">Daily Numbers</h4>
                                                        <ul className="text-sm space-y-1 text-muted-foreground">
                                                            <li className="flex justify-between"><span>Leads Imported:</span> <span className="text-foreground font-medium">{report.dailyNumbers.newLeadsImported}</span></li>
                                                            <li className="flex justify-between"><span>Requests Sent:</span> <span className="text-foreground font-medium">{report.dailyNumbers.friendRequestsSent}</span></li>
                                                            <li className="flex justify-between"><span>Convos Started:</span> <span className="text-foreground font-medium">{report.dailyNumbers.newConversationsStarted}</span></li>
                                                            <li className="flex justify-between"><span>Nurture Responses:</span> <span className="text-foreground font-medium">{report.dailyNumbers.nurtureResponsesSent}</span></li>
                                                            <li className="flex justify-between font-bold text-foreground"><span>Calls Booked:</span> <span>{report.dailyNumbers.callsBooked}</span></li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-primary mb-2">Pipeline Movement</h4>
                                                        <ul className="text-sm space-y-1 text-muted-foreground">
                                                            <li className="flex justify-between"><span>New Replies:</span> <span className="text-foreground font-medium">{report.pipelineMovement.newReplies}</span></li>
                                                            <li className="flex justify-between"><span>Pending Bookings:</span> <span className="text-foreground font-medium">{report.pipelineMovement.pendingBookings}</span></li>
                                                            <li className="flex justify-between"><span>Qualified Added:</span> <span className="text-foreground font-medium">{report.pipelineMovement.qualifiedAdded}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-primary mb-2">Account Health</h4>
                                                        <div className="text-sm">
                                                            <p className="font-medium mb-1 capitalize">{report.accountHealth.status}</p>
                                                            {report.accountHealth.warnings && <p className="text-muted-foreground italic mb-1">"{report.accountHealth.warnings}"</p>}
                                                            {report.accountHealth.actionTaken && <p className="text-muted-foreground">Action: {report.accountHealth.actionTaken}</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-primary mb-2">Insights</h4>
                                                        <div className="text-sm space-y-2">
                                                            <p><span className="text-muted-foreground">Top Group:</span> {report.insights.topGroup}</p>
                                                            <p><span className="text-muted-foreground">Winning Hook:</span> {report.insights.winningHook}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {report.blockers && (
                                                <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20 mt-2">
                                                    <p className="text-sm font-semibold text-destructive flex items-center gap-2">
                                                        <Ban className="h-4 w-4" /> Blockers
                                                    </p>
                                                    <p className="text-sm text-destructive/80 mt-1">{report.blockers}</p>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
