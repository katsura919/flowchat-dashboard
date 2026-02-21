"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Checkbox } from "@/components/ui/checkbox";

const accountItems = [
  {
    id: "flowchat-access",
    label: "FlowChat Access",
    desc: "Confirm login and that the account is active with no pending restrictions.",
  },
  {
    id: "facebook-integrations",
    label: "Facebook & Integrations",
    desc: "Check that Facebook is connected and syncing properly. Confirm any other linked platforms.",
  },
  {
    id: "booking-link",
    label: "Booking Link",
    desc: "Test the booking link end-to-end. Confirm it loads and sends a confirmation.",
  },
  {
    id: "crm-sync",
    label: "CRM or Calendar Sync",
    desc: "Verify that booked calls appear in the correct calendar or CRM. No gaps in the handoff.",
  },
  {
    id: "training-video",
    label: "Walkthrough Training Video",
    desc: "Review the training video inside the FlowChat platform before any client session.",
  },
  {
    id: "manual-testing",
    label: "Manual Testing",
    desc: "Run a test conversation manually from start to finish before the client is present.",
  },
];

export default function SetupPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const completedCount = Object.values(checked).filter(Boolean).length;
  return (
    <div>
      <PageHeader
        tag="VA Setup"
        title="Pre-Call Setup Protocol"
        description="Complete every item in this checklist before the client session and before any automation is turned on."
      />

      <section className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              1. Account Readiness
            </h2>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedCount} / {accountItems.length} completed
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Verify that all technical requirements are in place before running
            any walkthrough or campaign setup with the client.
          </p>

          <div className="space-y-2.5">
            {accountItems.map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className="flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors hover:bg-muted/40 has-[button[data-state=checked]]:bg-muted/40"
              >
                <Checkbox
                  id={item.id}
                  checked={!!checked[item.id]}
                  onCheckedChange={(val) =>
                    setChecked((prev) => ({ ...prev, [item.id]: !!val }))
                  }
                  className="mt-0.5 shrink-0"
                />
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
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

        <div className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            2. Strategy Clarification
          </h2>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Confirm the following details with the client before each session.
            Document everything. These inputs drive the entire campaign setup.
          </p>

          <div className="rounded-lg border divide-y">
            {[
              {
                field: "Target Niche",
                desc: "The specific market or industry the client serves.",
              },
              {
                field: "Ideal Customer Profile (ICP)",
                desc: "Detailed description of the exact type of person to target.",
              },
              {
                field: "Offer and Pricing",
                desc: "What is being sold and at what price point. This affects message tone.",
              },
              {
                field: "Weekly Call Goal",
                desc: "How many discovery or sales calls per week the client wants.",
              },
              {
                field: "Revenue Goal",
                desc: "Monthly or quarterly revenue target. Drives volume decisions.",
              },
            ].map((item) => (
              <div key={item.field} className="flex gap-4 px-4 py-3.5">
                <p className="w-44 shrink-0 text-sm font-semibold text-foreground">
                  {item.field}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Callout type="warning" title="Document Everything">
          After every strategy call, update a shared document with the confirmed
          ICP, offer details, and weekly targets. Never run a campaign based on
          unconfirmed assumptions.
        </Callout>
      </section>
    </div>
  );
}
