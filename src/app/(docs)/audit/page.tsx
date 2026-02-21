"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const stages = [
  "Stage 1 — Build",
  "Stage 2 — Scale",
  "Stage 3 — Invite",
  "Stage 4 — Optimize",
];

const qualityItems = [
  {
    id: "audience",
    label: "Audience Integrity",
    desc: "Imported leads match the Ideal Client criteria defined in Stage 1.",
  },
  {
    id: "sequence",
    label: "Messaging Sequence",
    desc: "Sequence has been updated or rotated in the Builder this week.",
  },
  {
    id: "doubletap",
    label: "The Double-Tap",
    desc: "VA is capturing email/phone numbers immediately after sending every booking link.",
  },
  {
    id: "followups",
    label: "Follow-ups",
    desc: "Leads are receiving at least 5+ follow-up touches before archiving.",
  },
];

const focusOptions = [
  "Improve targeting",
  "Improve opener message",
  "Improve call invite script",
  "Increase outreach volume",
  "Reduce volume for account safety",
];

type QualityState = Record<string, boolean>;

export default function AuditPage() {
  const [vaName, setVaName] = useState("");
  const [weekEnding, setWeekEnding] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [imports, setImports] = useState("");
  const [requests, setRequests] = useState("");
  const [acceptanceRate, setAcceptanceRate] = useState("");
  const [replyRate, setReplyRate] = useState("");
  const [bookingLinks, setBookingLinks] = useState("");
  const [callsBooked, setCallsBooked] = useState("");
  const [noShowRate, setNoShowRate] = useState("");
  const [messagesHit, setMessagesHit] = useState("");
  const [manualReplies, setManualReplies] = useState("");
  const [quality, setQuality] = useState<QualityState>({});
  const [bottleneck, setBottleneck] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [nextWeekGoal, setNextWeekGoal] = useState("");
  const [nextFocus, setNextFocus] = useState("");

  const qualityCount = Object.values(quality).filter(Boolean).length;

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const [{ downloadPdf }, { AuditPdf }] = await Promise.all([
      import("@/lib/download-pdf"),
      import("@/lib/audit-pdf"),
    ]);
    await downloadPdf(
      AuditPdf({
        vaName,
        weekEnding,
        selectedStage,
        imports,
        requests,
        acceptanceRate,
        replyRate,
        messagesHit,
        manualReplies,
        bookingLinks,
        callsBooked,
        noShowRate,
        quality,
        bottleneck,
        adjustment,
        nextWeekGoal,
        nextFocus,
      }),
      "weekly-growth-audit.pdf",
    );
    setDownloading(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <div className="flex-1">
          <PageHeader
            tag="Growth System"
            title="Weekly Growth Audit"
            description="Complete this audit every Friday. It gives a full picture of pipeline health and identifies exactly where to focus next week."
          />
        </div>
      </div>

      <div className="print:hidden mb-6 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Generating PDF…" : "Download PDF"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Header fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              VA Name
            </label>
            <input
              value={vaName}
              onChange={(e) => setVaName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              Week Ending
            </label>
            <input
              type="date"
              value={weekEnding}
              onChange={(e) => setWeekEnding(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Phase selector */}
        <div className="rounded-lg border p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            Phase Identifier — What stage are we in this week?
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {stages.map((s) => (
              <label
                key={s}
                className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  selectedStage === s
                    ? "border-primary bg-accent"
                    : "hover:bg-muted/40"
                }`}
              >
                <input
                  type="radio"
                  name="stage"
                  value={s}
                  checked={selectedStage === s}
                  onChange={() => setSelectedStage(s)}
                  className="accent-primary"
                />
                <span className="text-sm font-medium text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Input Health */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b">
            <p className="text-sm font-semibold text-foreground">
              Stage 1 & 2 — Pipeline Health (Inputs)
            </p>
          </div>
          <div className="divide-y">
            {[
              {
                label: "New Leads Imported",
                placeholder: "e.g. 312",
                target: "100–500",
                value: imports,
                setter: setImports,
              },
              {
                label: "Daily Connection Requests",
                placeholder: "e.g. 18",
                target: "10–20+",
                value: requests,
                setter: setRequests,
              },
              {
                label: "Acceptance Rate",
                placeholder: "e.g. 34%",
                target: "≥ 30%",
                value: acceptanceRate,
                setter: setAcceptanceRate,
              },
              {
                label: "Reply Rate",
                placeholder: "e.g. 12%",
                target: "≥ 10%",
                value: replyRate,
                setter: setReplyRate,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 items-center gap-4 px-4 py-3"
              >
                <p className="text-sm font-medium text-foreground">
                  {row.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: {row.target}
                </p>
                <input
                  value={row.value}
                  onChange={(e) => row.setter(e.target.value)}
                  placeholder={row.placeholder}
                  className="rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Output Health */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b">
            <p className="text-sm font-semibold text-foreground">
              Stage 3 & 4 — Conversion Health (Outputs)
            </p>
          </div>
          <div className="divide-y">
            {[
              {
                label: "Initial Messages Sent (10+ daily target?)",
                placeholder: "Yes / No",
                value: messagesHit,
                setter: setMessagesHit,
              },
              {
                label: "Manual Replies (100% inbound handled?)",
                placeholder: "Yes / No",
                value: manualReplies,
                setter: setManualReplies,
              },
              {
                label: "Booking Links Sent",
                placeholder: "e.g. 5",
                value: bookingLinks,
                setter: setBookingLinks,
              },
              {
                label: "Calls Booked (confirmed)",
                placeholder: "e.g. 3",
                value: callsBooked,
                setter: setCallsBooked,
              },
              {
                label: "No-Show Rate",
                placeholder: "e.g. 1 of 3",
                value: noShowRate,
                setter: setNoShowRate,
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
                  className="w-32 rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quality Control */}
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between bg-muted/50 px-4 py-3 border-b">
            <p className="text-sm font-semibold text-foreground">
              Quality Control Checklist
            </p>
            <span className="text-xs text-muted-foreground tabular-nums">
              {qualityCount} / {qualityItems.length} confirmed
            </span>
          </div>
          <div className="divide-y">
            {qualityItems.map((item) => (
              <label
                key={item.id}
                htmlFor={`q-${item.id}`}
                className="flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-muted/30 transition-colors has-[button[data-state=checked]]:bg-muted/30"
              >
                <Checkbox
                  id={`q-${item.id}`}
                  checked={!!quality[item.id]}
                  onCheckedChange={(val) =>
                    setQuality((p) => ({ ...p, [item.id]: !!val }))
                  }
                  className="mt-0.5 shrink-0"
                />
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${quality[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Bottleneck */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Bottleneck Identified
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              What is stopping progression? (e.g. Leads not accepting; ghosting
              after link sent)
            </p>
            <textarea
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              rows={3}
              placeholder="Describe the bottleneck..."
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Required Adjustment
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              What specific change will address the bottleneck? (e.g. Change
              Stage 06 opener; refresh FB group source)
            </p>
            <textarea
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              rows={3}
              placeholder="Describe the adjustment..."
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Goal for Next Week
            </label>
            <input
              value={nextWeekGoal}
              onChange={(e) => setNextWeekGoal(e.target.value)}
              placeholder="e.g. Transition from Stage 2 to Stage 3"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Next week focus */}
        <div className="rounded-lg border p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            Next Week Focus — Choose one priority
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {focusOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  nextFocus === opt
                    ? "border-primary bg-accent"
                    : "hover:bg-muted/40"
                }`}
              >
                <input
                  type="radio"
                  name="focus"
                  value={opt}
                  checked={nextFocus === opt}
                  onChange={() => setNextFocus(opt)}
                  className="accent-primary"
                />
                <span className="text-sm text-foreground">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <Callout type="tip" title="Manager Note">
          If the VA is consistently hitting Stage 2 numbers but Stage 3 calls
          are not materializing, the issue is almost always messaging tone or
          lead quality — not volume. Use the Script Playbook to sharpen manual
          replies before increasing imports.
        </Callout>

        <div className="print:hidden flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={downloading}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating PDF…" : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
