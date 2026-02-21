import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Strategic Roadmap",
    subtitle: "FlowChat Client Walkthrough & VA Management Guide",
    href: "/overview",
  },
  {
    number: "02",
    title: "Operational System",
    subtitle: "The 30-60-90 Daily Schedule & Weekly Audits",
    href: "/va-role",
  },
  {
    number: "03",
    title: "The Playbook",
    subtitle: "Messaging Scripts, Rebuttals, and Pivot Language",
    href: "/day/3",
  },
  {
    number: "04",
    title: "Reporting Hub",
    subtitle: "Daily Operations Report Template",
    href: "/optimization",
  },
  {
    number: "05",
    title: "Quality Control",
    subtitle: "VA Readiness & Certification Checklist",
    href: "/setup",
  },
  {
    number: "06",
    title: "Client Relations",
    subtitle: "Quick-Start Guide & Crisis Protocols",
    href: "/compliance",
  },
];

const days = [
  {
    day: "Day 1",
    title: "FlowChat Overview & Strategy Alignment",
    summary:
      "Align the client with the 4-step system. Confirm understanding before any technical setup begins.",
    href: "/day/1",
  },
  {
    day: "Day 2",
    title: "Lead Import & Conversation Logic",
    summary:
      "Identify target groups, set up qualification filters, and configure the friend request and first message flow.",
    href: "/day/2",
  },
  {
    day: "Day 3",
    title: "Manual Messaging & Nurturing",
    summary:
      "Handle replies manually, run the ghosting protocol, and use the double-tap booking method.",
    href: "/day/3",
  },
  {
    day: "Day 4",
    title: "Automation, Scaling & Revenue Logic",
    summary:
      "Configure pipeline triggers, scale with fresh lead sources, and connect outreach volume to weekly call targets.",
    href: "/day/4",
  },
];

export default function BlueprintPage() {
  return (
    <div>
      <PageHeader
        tag="Getting Started"
        title="The FlowChat VA SOP Growth Blueprint"
        description="A complete operating system for Virtual Assistants managing FlowChat for clients. Six modules covering every stage from setup to scale."
      />

      <section className="space-y-10">
        {/* 6 Modules */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            The Six Modules
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((m) => (
              <Link
                key={m.number}
                href={m.href}
                className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:bg-accent/40"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-muted-foreground/40 leading-none group-hover:text-primary transition-colors">
                    {m.number}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {m.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {m.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">Purpose</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            This SOP guides Virtual Assistants to do three things correctly and
            consistently:
          </p>
          <div className="space-y-2.5">
            {[
              "Explain and demonstrate FlowChat to clients with confidence.",
              "Implement and manage FlowChat for a business as a daily operator.",
              "Maintain, optimize, and scale the system responsibly over time.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border bg-card p-3.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Core Objective">
            Structured lead generation, efficient conversations, and predictable
            booked calls — every week, at scale.
          </Callout>
        </div>

        {/* Day-by-Day Quick Reference */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Daily Walkthrough At a Glance
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The client walkthrough spans four days. Each day has a specific
            objective. Click any day to read the full guide.
          </p>
          <div className="space-y-3">
            {days.map((d) => (
              <Link
                key={d.day}
                href={d.href}
                className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:border-primary hover:bg-accent/40"
              >
                <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {d.day}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {d.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {d.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
