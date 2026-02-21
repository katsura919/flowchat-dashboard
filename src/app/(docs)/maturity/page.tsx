import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

const stages = [
  {
    number: "1",
    label: "Foundation",
    subtitle: "Stability First",
    objective:
      "Build a clean, controlled pipeline without triggering platform restrictions.",
    targets: [
      { action: "Daily Imports", value: "50–100 leads" },
      { action: "Friend Requests", value: "10/day (warm) | 5/day (cold)" },
      { action: "Manual Qualification", value: "20–30 leads" },
      { action: "Initial Messages", value: "Sent only after acceptance" },
      { action: "Booking Links", value: "N/A" },
    ],
    focus: [
      "ICP accuracy above everything else",
      "Message personalization on every opener",
      "Acceptance rate above 30%",
      "Reply rate above 10%",
    ],
    gates: [
      "Acceptance rate drops below 20%",
      "Reply rate drops below 5%",
      "Any Facebook warning or action block received",
    ],
    gateLabel: "Do not scale if:",
    gateType: "danger" as const,
    note: "Minimum 7 days of clean activity before advancing to Stage 2.",
  },
  {
    number: "2",
    label: "Controlled Scale",
    subtitle: "Increase Inputs Safely",
    objective:
      "Increase lead volume while protecting account health. Automation handles the first touch; humans handle every conversation.",
    targets: [
      { action: "Daily Imports", value: "150–300 leads" },
      { action: "Friend Requests", value: "15/day (warm accounts only)" },
      { action: "Initial Messages", value: "Automated after acceptance" },
      { action: "Manual Replies", value: "100% of inbound — no exceptions" },
      { action: "Booking Links", value: "Begin testing" },
    ],
    focus: [
      "Automation handles first message only",
      "VA handles every inbound reply manually",
      "Monitor acceptance and reply rates daily",
      "Continue rotating message templates weekly",
    ],
    gates: [
      "No warnings in the last 14 days",
      "Acceptance rate stable above 30%",
      "Booking link sent at least 3 times in one week",
    ],
    gateLabel: "Advance to Stage 3 only if all are true:",
    gateType: "warning" as const,
    note: null,
  },
  {
    number: "3",
    label: "Conversion Focus",
    subtitle: "Turn Conversations into Calls",
    objective:
      "Aggressively convert active conversations into booked calls. Volume is secondary to quality of follow-through.",
    targets: [
      { action: "Daily Imports", value: "500+ leads" },
      { action: "Friend Requests", value: "Automated" },
      { action: "Initial Messages", value: "Automated" },
      { action: "Manual Replies", value: "100% within 4 hours" },
      { action: "Booking Links", value: "3+ per week" },
    ],
    focus: [
      "Reply to every inbound within 4 hours during business hours",
      "Execute Ghosting Protocol: 48h value bump → 7-day break-up message",
      "Use Double-Tap method on every booking link sent",
      "Send at least 3 booking links weekly",
    ],
    gates: [
      "3+ calls booked weekly",
      "No safety warnings in the last 7 days",
      "Quality conversations maintained — not just volume",
    ],
    gateLabel: "Scale input further only if all are true:",
    gateType: "warning" as const,
    note: null,
  },
  {
    number: "4",
    label: "Optimization",
    subtitle: "Consistency at Scale",
    objective:
      "Stabilize at 3–5 booked calls per week. Optimize the system continuously using data, not guesswork.",
    targets: [
      {
        action: "Weekly Imports",
        value: "300–500 (mature accounts only, 30+ days)",
      },
      { action: "Friend Requests", value: "Automated" },
      { action: "Booking Links", value: "5+ per week" },
      { action: "Calls Booked", value: "3+ confirmed per week" },
    ],
    focus: [
      "Rotate Stage 06 opener every 2–3 weeks",
      "Replace underperforming Facebook groups",
      "Improve invite script based on booking rate",
      "Refine ICP filters based on who is actually converting",
    ],
    gates: null,
    gateLabel: null,
    gateType: "warning" as const,
    note: null,
  },
];

const summaryRows = [
  { metric: "Daily Imports", s1: "100+", s2: "300", s3: "500+", s4: "300–500" },
  {
    metric: "Friend Requests",
    s1: "10+",
    s2: "15–20+",
    s3: "Automated",
    s4: "Automated",
  },
  {
    metric: "Messages Sent",
    s1: "3+",
    s2: "10+",
    s3: "High Volume",
    s4: "High Volume",
  },
  { metric: "Booking Links", s1: "N/A", s2: "N/A", s3: "3+", s4: "5+" },
];

const safetyLocks = [
  "No warning notifications in the last 7 days",
  "Acceptance rate at or above 30%",
  "Reply rate at or above 10%",
  "No recent message blocks",
];

export default function MaturityPage() {
  return (
    <div>
      <PageHeader
        tag="Growth System"
        title="Maturity Roadmap"
        description="The 4-stage growth ladder for running FlowChat at scale. Each stage has clear daily targets, focus areas, and gate criteria that must be passed before advancing."
      />

      <Callout type="info" title="How to Use This Page">
        Start at Stage 1 — always. Never skip ahead. Each stage gate exists to
        protect the account and ensure the foundations are solid before volume
        increases. Rushing stages is the primary cause of account restrictions.
      </Callout>

      <section className="mt-8 space-y-8">
        {stages.map((stage, idx) => (
          <div key={stage.number} className="rounded-lg border overflow-hidden">
            {/* Stage header */}
            <div className="flex items-center gap-4 bg-muted/50 px-5 py-4 border-b">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {stage.number}
              </span>
              <div>
                <p className="font-bold text-foreground leading-none">
                  {stage.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stage.subtitle}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Objective */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.objective}
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Targets */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Daily Targets
                  </p>
                  <div className="rounded-lg border divide-y">
                    {stage.targets.map((t) => (
                      <div
                        key={t.action}
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <p className="text-xs font-medium text-foreground w-36 shrink-0">
                          {t.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Focus */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Focus Areas
                  </p>
                  <ul className="space-y-2">
                    {stage.focus.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stage gate */}
              {stage.gates && (
                <div
                  className={`rounded-lg border-l-4 px-4 py-3 text-sm ${
                    stage.gateType === "danger"
                      ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                      : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
                  }`}
                >
                  <p
                    className={`font-semibold mb-2 text-xs uppercase tracking-widest ${
                      stage.gateType === "danger"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-700 dark:text-yellow-400"
                    }`}
                  >
                    {stage.gateLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {stage.gates.map((g, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground/80"
                      >
                        <span
                          className={`font-bold shrink-0 ${
                            stage.gateType === "danger"
                              ? "text-red-500"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          ›
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {stage.note && (
                <p className="text-xs text-muted-foreground italic border-t pt-3">
                  {stage.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Safety Lock System */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          Safety Lock System
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Before increasing volume at any stage, all four conditions must be
          confirmed. If any single condition fails, drop one stage lower
          immediately — do not try to push through.
        </p>
        <div className="space-y-2.5">
          {safetyLocks.map((lock, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-3.5"
            >
              <div className="h-4 w-4 shrink-0 rounded border-2 border-muted-foreground/40" />
              <p className="text-sm text-foreground">{lock}</p>
            </div>
          ))}
        </div>

        <Callout type="danger" title="Non-Negotiable">
          If any of the four safety locks fail, drop one stage immediately. Do
          not try to maintain volume. The account is the long-term asset —
          protect it.
        </Callout>
      </section>

      {/* VA Operational Summary */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          VA Operational Summary
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Key metrics at each stage at a glance. Use this as a quick reference
          during daily operations.
        </p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Metric
                </th>
                {["Stage 1", "Stage 2", "Stage 3", "Stage 4"].map((s) => (
                  <th
                    key={s}
                    className="px-4 py-3 text-left font-semibold text-foreground"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {summaryRows.map((row) => (
                <tr
                  key={row.metric}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.metric}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.s1}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.s2}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.s3}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.s4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
