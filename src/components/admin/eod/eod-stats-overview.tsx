"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, MessageCircle, Phone, ArrowUpRight, Reply } from "lucide-react";
import { AdminEodSummary } from "@/hooks/admin-eod";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminEodStatsOverview({ summary, isLoading }: { summary?: AdminEodSummary, isLoading: boolean }) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const stats = [
        {
            label: "Total Leads",
            value: summary?.totalLeadsImported ?? 0,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Total Invites",
            value: summary?.totalFriendRequestsSent ?? 0,
            icon: UserPlus,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Total Convos",
            value: summary?.totalConversationsStarted ?? 0,
            icon: MessageCircle,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            label: "Total Booked",
            value: summary?.totalCallsBooked ?? 0,
            icon: Phone,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: "Total Replies",
            value: summary?.totalNewReplies ?? 0,
            icon: Reply,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                            From {summary?.reportCount ?? 0} total reports
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
