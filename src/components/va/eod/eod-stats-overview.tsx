"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { EodReport } from "@/hooks/eod-reports";

export function EodStatsOverview({ lastReport }: { lastReport?: EodReport }) {
    const stats = [
        {
            label: "New Leads",
            value: lastReport?.dailyNumbers.newLeadsImported ?? 0,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Friend Requests",
            value: lastReport?.dailyNumbers.friendRequestsSent ?? 0,
            icon: UserPlus,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Conversations",
            value: lastReport?.dailyNumbers.newConversationsStarted ?? 0,
            icon: MessageCircle,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            label: "Calls Booked",
            value: lastReport?.dailyNumbers.callsBooked ?? 0,
            icon: Phone,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                            <span>From last report</span>
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
