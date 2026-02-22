"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhaseItem {
  id: string;
  text: string;
}

interface Phase {
  id: string;
  phase: string;
  label: string;
  required?: boolean;
  passMark?: number;
  items: PhaseItem[];
}

const phases: Phase[] = [
  {
    id: "technical",
    phase: "Phase 1",
    label: "Technical",
    required: false,
    items: [
      { id: "t1", text: "Import 50 leads using a keyword filter" },
      { id: "t2", text: "Move a lead correctly through Stages 01–10" },
      { id: "t3", text: "Edit and rotate message templates in the Builder" },
      {
        id: "t4",
        text: "Confirm booking link is active and working end-to-end",
      },
      { id: "t5", text: "Archive leads that have been inactive for 21+ days" },
    ],
  },
  {
    id: "safety",
    phase: "Phase 2",
    label: "Safety",
    required: true,
    passMark: 100,
    items: [
      {
        id: "s1",
        text: "Recite the safe daily limits for warm and cold accounts from memory",
      },
      {
        id: "s2",
        text: "Identify and correctly respond to a Facebook 'Please slow down' warning",
      },
      {
        id: "s3",
        text: "Explain why template rotation matters for account health",
      },
      {
        id: "s4",
        text: "Demonstrate correct manual message spacing (not bulk-sending)",
      },
    ],
  },
  {
    id: "communication",
    phase: "Phase 3",
    label: "Communication",
    required: false,
    passMark: 80,
    items: [
      {
        id: "c1",
        text: "Convert a 'How much does it cost?' message into a booking",
      },
      {
        id: "c2",
        text: "Execute the full Ghosting Protocol correctly (48h bump → 7-day break-up → archive)",
      },
      { id: "c3", text: "Perform the Double-Tap booking method correctly" },
      {
        id: "c4",
        text: "Rewrite a robotic message into a natural, human-sounding response",
      },
      { id: "c5", text: "Handle a 'Is this a bot?' reply correctly" },
    ],
  },
];

export default function CertificationPage() {
  const [candidateName, setCandidateName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [downloading, setDownloading] = useState(false);

  const toggle = (id: string, val: boolean) =>
    setChecked((p) => ({ ...p, [id]: val }));

  const safetyItems = phases.find((p) => p.id === "safety")!.items;
  const commItems = phases.find((p) => p.id === "communication")!.items;
  const safetyCount = safetyItems.filter((i) => checked[i.id]).length;
  const commCount = commItems.filter((i) => checked[i.id]).length;

  const safetyPassed = safetyCount === safetyItems.length;
  const commPassed = commCount / commItems.length >= 0.8;
  const graduated = safetyPassed && commPassed;

  const handleDownloadCertificate = async () => {
    if (!graduated) return;
    setDownloading(true);
    try {
      const [{ downloadPdf }, { CertificatePdf }] = await Promise.all([
        import("@/lib/download-pdf"),
        import("@/lib/certificate-pdf"),
      ]);
      await downloadPdf(
        <CertificatePdf
          candidateName={candidateName}
          trainerName={trainerName}
          date={new Date().toISOString()}
        />,
        `VA-Certificate-${candidateName.replace(/\s+/g, "-") || "Graduated"}.pdf`
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <PageHeader
        tag="Quality & Compliance"
        title="VA Certification Checklist"
        description="Internal use only. Complete all three phases to achieve VA certification. Phase 2 (Safety) requires 100% completion. Phase 3 (Communication) requires 80%."
      />

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
            Candidate Name
          </label>
          <input
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Full name of the VA"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
            Trainer / Supervisor
          </label>
          <input
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            placeholder="Name of person certifying"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Graduation status */}
      <div
        className={cn(
          "mb-8 rounded-lg border p-4 flex items-center justify-between gap-4",
          graduated
            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
            : "border-muted bg-muted/30",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm",
              graduated
                ? "bg-emerald-500 text-white"
                : "bg-muted text-muted-foreground",
            )}
          >
            {graduated ? "✓" : "–"}
          </div>
          <div>
            <p
              className={cn(
                "font-semibold text-sm",
                graduated
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted-foreground",
              )}
            >
              {graduated ? "Certification Requirements Met" : "Not Yet Certified"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Safety: {safetyCount}/{safetyItems.length} (need 100%) &nbsp;·&nbsp;
              Communication: {commCount}/{commItems.length} (need 4/5 — 80%)
            </p>
          </div>
        </div>

        {graduated && (
          <Button
            size="sm"
            onClick={handleDownloadCertificate}
            disabled={downloading || !candidateName.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            {downloading ? (
              "Generating…"
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download Certificate
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {phases.map((phase) => {
          const completed = phase.items.filter((i) => checked[i.id]).length;
          const total = phase.items.length;
          const pct = Math.round((completed / total) * 100);

          return (
            <div key={phase.id} className="rounded-lg border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between bg-muted/50 px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {phase.phase}
                  </span>
                  <span className="font-semibold text-foreground">
                    {phase.label}
                  </span>
                  {phase.required && (
                    <span className="text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 px-2 py-0.5 font-semibold">
                      100% Required
                    </span>
                  )}
                  {phase.passMark === 80 && (
                    <span className="text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 font-semibold">
                      80% Required
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {completed} / {total} ({pct}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-muted">
                <div
                  className={cn(
                    "h-1 transition-all duration-300",
                    pct === 100 ? "bg-emerald-500" : "bg-primary",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Items */}
              <div className="divide-y">
                {phase.items.map((item) => (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className="flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-muted/30 transition-colors has-[button[data-state=checked]]:bg-muted/30"
                  >
                    <Checkbox
                      id={item.id}
                      checked={!!checked[item.id]}
                      onCheckedChange={(val: boolean | "indeterminate") => toggle(item.id, !!val)}
                      className="mt-0.5 shrink-0"
                    />
                    <p
                      className={cn(
                        "text-sm transition-colors",
                        checked[item.id]
                          ? "line-through text-muted-foreground"
                          : "text-foreground",
                      )}
                    >
                      {item.text}
                    </p>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          Graduation Requirements
        </h2>
        <div className="rounded-lg border divide-y">
          {[
            {
              label: "Phase 2 — Safety",
              req: "100% completion required. No exceptions. A VA who does not know the safety rules is a liability to the account.",
              met: safetyPassed,
            },
            {
              label: "Phase 3 — Communication",
              req: "80% completion required (4 of 5 items). Covers the core conversion skills needed for daily operation.",
              met: commPassed,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 px-4 py-3.5"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  item.met
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {item.met ? "✓" : "–"}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.req}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="info" title="Internal Use Only">
        This checklist is for the operations or training team to verify
        readiness before a VA begins managing a live client account. Do not
        share this page directly with the client.
      </Callout>
    </div>
  );
}
