"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/page-header";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type HealthStatus = "healthy" | "warning" | "blocked";

export default function ReportPage() {
  const [date, setDate] = useState("");
  const [vaName, setVaName] = useState("");

  // 1. Daily Numbers
  const [imported, setImported] = useState("");
  const [requestsSent, setRequestsSent] = useState("");
  const [conversationsStarted, setConversationsStarted] = useState("");
  const [nurtureReplies, setNurtureReplies] = useState("");
  const [callsBooked, setCallsBooked] = useState("");

  // 2. Pipeline Movement
  const [newReplies, setNewReplies] = useState("");
  const [pendingBookings, setPendingBookings] = useState("");
  const [qualifiedAdded, setQualifiedAdded] = useState("");

  // 3. Account Health
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("healthy");
  const [warnings, setWarnings] = useState("");
  const [actionTaken, setActionTaken] = useState("");

  // 4. Insights
  const [topGroup, setTopGroup] = useState("");
  const [commonObjection, setCommonObjection] = useState("");
  const [winningHook, setWinningHook] = useState("");
  const [recommendations, setRecommendations] = useState("");

  // 5. Blockers
  const [blockers, setBlockers] = useState("");

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const [{ downloadPdf }, { ReportPdf }] = await Promise.all([
      import("@/lib/download-pdf"),
      import("@/lib/report-pdf"),
    ]);
    await downloadPdf(
      ReportPdf({
        vaName,
        date,
        imported,
        requestsSent,
        conversationsStarted,
        nurtureReplies,
        callsBooked,
        newReplies,
        pendingBookings,
        qualifiedAdded,
        healthStatus,
        warnings,
        actionTaken,
        topGroup,
        commonObjection,
        winningHook,
        recommendations,
        blockers,
      }),
      "daily-operations-report.pdf",
    );
    setDownloading(false);
  };

  const healthConfig: Record<HealthStatus, { label: string; color: string }> = {
    healthy: {
      label: "Healthy",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    warning: {
      label: "Warning",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    blocked: { label: "Blocked", color: "text-red-600 dark:text-red-400" },
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <div className="flex-1">
          <PageHeader
            tag="Playbooks"
            title="Daily Operations Report"
            description="Complete and submit this report at the end of every working day. Covers lead generation numbers, pipeline movement, account health, and key insights."
          />
        </div>
      </div>

      {/* <div className="print:hidden mb-6 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={downloading || !vaName.trim() || !date.trim()}
          className="gap-2"
          title={
            !vaName.trim() || !date.trim()
              ? "VA Name and Date are required"
              : undefined
          }
        >
          <Download className="h-4 w-4" />
          {downloading ? "Generating PDF…" : "Download PDF"}
        </Button>
      </div> */}

      <div className="space-y-6">
        {/* Header */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              VA Name <span className="text-destructive">*</span>
            </label>
            <input
              value={vaName}
              onChange={(e) => setVaName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              Date <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Section 1 */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
              1
            </span>
            <p className="text-sm font-semibold text-foreground">
              Daily Numbers
            </p>
          </div>
          <div className="divide-y">
            {[
              {
                label: "New Leads Imported",
                placeholder: "e.g. 200",
                value: imported,
                setter: setImported,
              },
              {
                label: "Friend Requests Sent",
                placeholder: "e.g. 25",
                value: requestsSent,
                setter: setRequestsSent,
              },
              {
                label: "New Conversations Started",
                placeholder: "e.g. 8",
                value: conversationsStarted,
                setter: setConversationsStarted,
              },
              {
                label: "Nurture Responses Sent",
                placeholder: "e.g. 14",
                value: nurtureReplies,
                setter: setNurtureReplies,
              },
              {
                label: "Calls Booked",
                placeholder: "e.g. 2",
                value: callsBooked,
                setter: setCallsBooked,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-4 py-3"
              >
                <p className="flex-1 text-sm font-medium text-foreground">
                  {row.label}
                </p>
                <input
                  value={row.value}
                  onChange={(e) => row.setter(e.target.value)}
                  placeholder={row.placeholder}
                  className="w-28 rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-right"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
              2
            </span>
            <p className="text-sm font-semibold text-foreground">
              Pipeline Movement
            </p>
          </div>
          <div className="divide-y">
            {[
              {
                label: "New Replies (Stage 07)",
                placeholder: "e.g. 6",
                value: newReplies,
                setter: setNewReplies,
              },
              {
                label: "Pending Bookings",
                placeholder: "e.g. 3",
                value: pendingBookings,
                setter: setPendingBookings,
              },
              {
                label: "Qualified Leads Added to Pipeline",
                placeholder: "e.g. 9",
                value: qualifiedAdded,
                setter: setQualifiedAdded,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-4 py-3"
              >
                <p className="flex-1 text-sm font-medium text-foreground">
                  {row.label}
                </p>
                <input
                  value={row.value}
                  onChange={(e) => row.setter(e.target.value)}
                  placeholder={row.placeholder}
                  className="w-28 rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-right"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
              3
            </span>
            <p className="text-sm font-semibold text-foreground">
              Account Health
            </p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Status
              </p>
              <div className="flex gap-3 flex-wrap">
                {(["healthy", "warning", "blocked"] as HealthStatus[]).map(
                  (s) => (
                    <label
                      key={s}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
                        healthStatus === s
                          ? "border-primary bg-accent"
                          : "hover:bg-muted/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="health"
                        value={s}
                        checked={healthStatus === s}
                        onChange={() => setHealthStatus(s)}
                        className="accent-primary"
                      />
                      <span
                        className={`text-sm font-semibold ${healthConfig[s].color}`}
                      >
                        {healthConfig[s].label}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
            {healthStatus !== "healthy" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Warnings Received
                  </label>
                  <input
                    value={warnings}
                    onChange={(e) => setWarnings(e.target.value)}
                    placeholder="Describe any warnings..."
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Action Taken
                  </label>
                  <input
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                    placeholder="What did you do in response?"
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4 */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
              4
            </span>
            <p className="text-sm font-semibold text-foreground">Insights</p>
          </div>
          <div className="p-4 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Top Performing Group",
                placeholder: "Which FB group produced the best leads today?",
                value: topGroup,
                setter: setTopGroup,
              },
              {
                label: "Most Common Objection",
                placeholder: "What objection came up most?",
                value: commonObjection,
                setter: setCommonObjection,
              },
              {
                label: "Winning Hook / Message",
                placeholder: "Which opener got the best response today?",
                value: winningHook,
                setter: setWinningHook,
              },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {f.label}
                </label>
                <input
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Recommendations
              </label>
              <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                rows={2}
                placeholder="Anything to improve, change, or flag for tomorrow..."
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
              5
            </span>
            <p className="text-sm font-semibold text-foreground">Blockers</p>
          </div>
          <div className="p-4">
            <textarea
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              rows={3}
              placeholder="Anything that blocked progress today? Technical issues, unresolved leads, unclear instructions..."
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <div className="print:hidden flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={downloading || !vaName.trim() || !date.trim()}
            className="gap-2"
            title={
              !vaName.trim() || !date.trim()
                ? "VA Name and Date are required"
                : undefined
            }
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating PDF…" : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
