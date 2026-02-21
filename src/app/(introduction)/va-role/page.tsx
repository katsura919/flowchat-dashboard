import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

const roles = [
  {
    title: "Guide",
    desc: "Walk the client through each stage of the FlowChat system. Ensure they understand the purpose of every action before it is taken.",
  },
  {
    title: "Demonstrator",
    desc: "Show how the system works in practice. Run live walkthroughs, test the flow, and demonstrate expected outcomes.",
  },
  {
    title: "Operator",
    desc: "Run the system daily. Manage leads, respond to messages, move conversations through the pipeline, and maintain data hygiene.",
  },
  {
    title: "Checkpoint",
    desc: "Catch problems before they escalate. Monitor account health, flag restrictions, and report KPIs to the client every day.",
  },
];

const rhythm = [
  {
    block: "First 30 Minutes",
    label: "Inbox Cleanup",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    tasks: [
      "Respond to all Stage 07 (Messages Received) leads from overnight",
      "Check the account for any active Action Blocks or warnings",
      "Flag anything unusual to the client before proceeding",
    ],
  },
  {
    block: "Middle 60 Minutes",
    label: "Lead Gen & Movement",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    tasks: [
      "Import new leads from target Facebook groups",
      "Send the daily quota of Friend Requests (within safe thresholds)",
      "Move qualified leads forward through the pipeline stages",
    ],
  },
  {
    block: "Final 30 Minutes",
    label: "Data Hygiene",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
    tasks: [
      "Clear out stale or unresponsive leads from the active pipeline",
      "Update the Tracking Sheet with today's activity",
      "Report daily KPIs to the client — acceptance rate, replies, bookings",
    ],
  },
];

const skills = [
  {
    skill: "Rapport Building",
    desc: "Use conversational language to blend in naturally. Match the tone and style of the lead. People respond when they feel understood, not sold to.",
  },
  {
    skill: "Pattern Recognition",
    desc: "Identify which groups, messages, and audiences produce the highest-quality leads. Eliminate what does not work. Double down on what does.",
  },
  {
    skill: "Friction Reduction",
    desc: "Know when to stop asking questions and simply send the booking link. Over-qualifying kills momentum. Read the signal and act.",
  },
  {
    skill: "Active Listening",
    desc: "Read what the lead actually writes, not what you expect them to say. Adjust the direction of every conversation based on their words.",
  },
];

export default function VaRolePage() {
  return (
    <div>
      <PageHeader
        tag="Getting Started"
        title="VA Role & Daily Rhythm"
        description="The VA is not just sending messages. The VA is managing a lead pipeline — and a client relationship — every single day."
      />

      <section className="space-y-10">
        {/* VA Roles */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            The Four Hats of the VA
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            At different points in the day and across the client relationship,
            the VA operates in four distinct capacities. Each requires a
            different skill and mindset.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {roles.map((r) => (
              <div key={r.title} className="rounded-lg border bg-card p-4">
                <p className="font-semibold text-foreground text-sm">
                  {r.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 30-60-90 Rhythm */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-1">
            The 30-60-90 Daily Operating Rhythm
          </h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Every working day is structured into three blocks. This keeps
            momentum consistent and ensures nothing — especially data hygiene —
            gets skipped.
          </p>

          <div className="space-y-4">
            {rhythm.map((block) => (
              <div
                key={block.block}
                className="rounded-lg border overflow-hidden"
              >
                <div
                  className={`flex items-center justify-between px-4 py-2.5 ${block.color}`}
                >
                  <p className="text-sm font-bold">{block.block}</p>
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    {block.label}
                  </span>
                </div>
                <ul className="divide-y">
                  {block.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0 mt-1.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Callout type="info" title="Why This Structure Matters">
            The 30-60-90 rhythm prevents inbox pile-ups, ensures lead generation
            happens daily, and keeps the client informed. Skipping any block —
            especially data hygiene — compounds problems within a week.
          </Callout>
        </div>

        {/* VA Skills */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            VA Skill Focus Areas
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            These skills separate a VA who fills the pipeline from one who
            converts it. Technical setup can be learned in a day. These take
            intentional practice.
          </p>

          <div className="rounded-lg border divide-y">
            {skills.map((s) => (
              <div key={s.skill} className="px-4 py-4 flex gap-4">
                <p className="w-44 shrink-0 text-sm font-semibold text-foreground">
                  {s.skill}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <Callout type="tip" title="The Core Distinction">
            Automation fills the pipeline. Human communication is the conversion
            mechanism. The VA&apos;s technical setup creates the opportunity —
            the VA&apos;s conversational skill closes it.
          </Callout>
        </div>
      </section>
    </div>
  );
}
