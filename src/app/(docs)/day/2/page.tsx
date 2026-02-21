import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { StageCard } from "@/components/docs/stage-card";
import { Checklist } from "@/components/docs/checklist";

export default function Day2Page() {
  return (
    <div>
      <PageHeader
        day={2}
        title="Lead Import & Conversation Logic"
        description="Set up the lead pipeline from scratch. Define who you are targeting, where you are finding them, and how the automation handles each stage of the friend request and first message flow."
      />

      <section className="space-y-10">
        {/* Lead Import Strategy */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Lead Import Strategy
          </h2>

          <div>
            <h3 className="text-base font-semibold mb-2 text-foreground">
              Facebook Group Import
            </h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Facebook groups are the primary source of leads. Quality of the
              group determines quality of the pipeline. Do not import randomly.
            </p>

            <div className="space-y-2 mb-4">
              {[
                "Identify groups where your ICP is active and engaged",
                "Continuously search for new groups as existing ones saturate",
                "Import group members strategically based on engagement, not just membership",
                "Use effective keywords in the FlowChat extension filter",
                "Prioritize niche accuracy over volume",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-semibold text-foreground mb-2">
              VA Responsibilities — Lead Sources
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">›</span>{" "}
                Review and update group sources every week
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">›</span>{" "}
                Monitor lead quality — are replies relevant?
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">›</span>{" "}
                Replace underperforming groups with better-fit alternatives
              </li>
            </ul>
          </div>
        </div>

        {/* Qualification Setup */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Qualification Setup
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Before automation runs, the targeting filters must be configured.
            Sending requests to the wrong people wastes the account&apos;s daily
            limits.
          </p>

          <div className="rounded-lg border divide-y">
            {[
              {
                label: "Define ICP",
                detail:
                  "Document role, industry, pain points, and buying signals for the ideal lead.",
              },
              {
                label: "Update Audience Qualification Filters",
                detail:
                  "Apply the ICP inside FlowChat before importing any group.",
              },
              {
                label: "Adjust Based on Performance",
                detail:
                  "Review weekly. If acceptance or reply rate is low, the targeting is off.",
              },
            ].map((item) => (
              <div key={item.label} className="px-4 py-3.5 flex gap-4">
                <p className="w-52 shrink-0 text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Flow */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Friend Request & First Message Flow
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The pipeline moves leads through defined stages. Each stage has a
            system action and a VA responsibility.
          </p>

          <StageCard
            number={4}
            label="Friend Request Sent"
            systemAction="Friend request sent to the lead. If no action is taken within 3 weeks, the request is automatically removed."
            vaTask="Monitor acceptance rate daily. Ensure the 'Check new friends' queue is active and running."
          />

          <StageCard
            number={5}
            label="Friend Request Accepted"
            systemAction="Lead accepted the request. The system moves them into the first message queue."
            vaTask="No manual action required at this stage. Confirm the first message is set up correctly before automation runs."
          />

          <StageCard
            number={6}
            label="First Message Sent"
            systemAction="Opening message sent automatically once the friend request is accepted."
            vaTask="Before enabling automation: Update the first message on the builder page. Customize it per business. Save multiple template variations. Avoid repeated patterns."
          />
        </div>

        {/* YES/NO Logic */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Decision Logic
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            The pipeline filters non-responsive leads automatically. The VA does
            not chase people who are not interested.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Friend Request
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-bold text-red-500">No</span>
                  <span className="text-muted-foreground/50">—</span>
                  <span>
                    Not accepted — removed after 3 weeks automatically
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-bold text-emerald-600">Yes</span>
                  <span className="text-muted-foreground/50">—</span>
                  <span>Accepted — first message is sent</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">
                First Message
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-bold text-red-500">No</span>
                  <span className="text-muted-foreground/50">—</span>
                  <span>No reply — lead is removed from active pipeline</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-bold text-emerald-600">Yes</span>
                  <span className="text-muted-foreground/50">—</span>
                  <span>Replied — move forward to Stage 07</span>
                </div>
              </div>
            </div>
          </div>

          <Callout type="tip" title="Why This Matters">
            Non-responsive leads are filtered out protect the VA&apos;s time and
            keep the pipeline clean. Only engaged leads move forward.
          </Callout>
        </div>

        <Callout type="warning" title="Template Rotation">
          Before running any automation, save at least 3–4 variations of the
          opening message. Identical messages sent at volume trigger platform
          restrictions.
        </Callout>
      </section>
    </div>
  );
}
