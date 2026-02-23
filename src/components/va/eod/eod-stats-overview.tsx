"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
              <div className={`p-1.5 rounded-md ${stat.bg}`}>
                <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
              </div>
            </div>
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
