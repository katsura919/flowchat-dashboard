"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, MessageCircle, Phone, Reply } from "lucide-react";
import { AdminEodSummary } from "@/hooks/admin-eod";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminEodStatsOverview({
  summary,
  isLoading,
}: {
  summary?: AdminEodSummary;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="border shadow-sm">
            <CardContent className="p-4">
              <Skeleton className="h-3 w-20 mb-3" />
              <Skeleton className="h-7 w-14" />
              <Skeleton className="h-2.5 w-24 mt-1.5" />
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
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
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
            <div className="text-2xl font-bold">
              {stat.value.toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              From {summary?.reportCount ?? 0} reports
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
