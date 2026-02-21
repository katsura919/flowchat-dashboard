import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export default function Day4Page() {
  return (
    <div>
      <PageHeader
        day={4}
        title="Automation, Scaling & Revenue Logic"
        description="With the foundation set, Day 4 focuses on configuring automation correctly, understanding how the pipeline scales, and connecting outreach volume directly to revenue outcomes."
      />

      <section className="space-y-10">
        {/* Start Here Section */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            The Start Here Foundation
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Before scaling anything, the foundational elements must be solid.
            Scaling a broken foundation produces more broken results faster.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Audience",
                desc: "The ICP is defined, filters are set, and group sources are relevant and healthy.",
              },
              {
                label: "Messages",
                desc: "Opening messages are personalized, rotated, and template variations are saved.",
              },
              {
                label: "Pipeline Logic",
                desc: "All stages are configured, automation triggers are correct, and progression is logical.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border bg-card p-4">
                <p className="font-semibold text-primary text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <Callout type="warning" title="Before Scaling">
            Do not increase volume until all three foundations are confirmed.
            Scaling activity on a weak foundation wastes leads and risks account
            health.
          </Callout>
        </div>

        {/* Pipeline Setup */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Pipeline Setup
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The pipeline is the backbone of the entire system. Every lead
            follows a traceable path from import to outcome.
          </p>

          <div className="space-y-2.5">
            {[
              {
                check: "Clear stages defined",
                detail:
                  "Each stage has a name, a status, and a clear next action.",
              },
              {
                check: "Automation triggers set",
                detail:
                  "Messages fire based on specific actions — friend accepted, reply received, tag applied.",
              },
              {
                check: "Logical progression",
                detail:
                  "The pipeline moves from cold to warm to qualified to invited. No jumps.",
              },
            ].map((item) => (
              <div
                key={item.check}
                className="flex items-start gap-3 rounded-lg border p-3.5"
              >
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-muted-foreground/40" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.check}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Rules */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Automation Rules
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Automation handles early-stage, low-sensitivity actions. The VA
            handles everything that requires judgment.
          </p>

          <div className="rounded-lg border divide-y">
            {[
              {
                trigger: "Friend request accepted",
                action: "Send opening message automatically.",
              },
              {
                trigger: "Message received",
                action:
                  "Flag for VA manual response. No automation beyond this point.",
              },
              {
                trigger: "Tag applied",
                action: "Trigger follow-up sequence or move to next stage.",
              },
              {
                trigger: "No response after X days",
                action: "Auto-remove from active pipeline.",
              },
            ].map((item) => (
              <div key={item.trigger} className="px-4 py-3.5 flex gap-4">
                <p className="w-52 shrink-0 text-sm font-semibold text-foreground">
                  {item.trigger}
                </p>
                <p className="text-sm text-muted-foreground">{item.action}</p>
              </div>
            ))}
          </div>

          <Callout type="info" title="Automation Boundary">
            Automation handles the top of the funnel. Do not automate the
            nurture, qualification, or call invite stages. These require human
            judgment and personalization.
          </Callout>
        </div>

        {/* Scaling System */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Scaling the System
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Scaling is not about sending more messages randomly. It is about
            doing more of what already works, without compromising account
            health.
          </p>

          <div className="space-y-3">
            {[
              {
                req: "Fresh lead sources",
                desc: "Identify new groups continuously. Existing groups saturate over time.",
              },
              {
                req: "Updated qualification filters",
                desc: "Refine ICP filters based on who is actually converting in conversations.",
              },
              {
                req: "Rotating templates",
                desc: "Add new message variations before old ones trigger platform detection.",
              },
              {
                req: "Improved invite scripts",
                desc: "Test new approaches to the call invite. Optimize based on booking rate.",
              },
            ].map((item) => (
              <div key={item.req} className="rounded-lg border p-4 flex gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.req}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Scaling Principle">
            More leads follow the same structure. The pipeline does not change
            when volume increases — only the inputs do. Keep the structure
            clean.
          </Callout>
        </div>
      </section>
    </div>
  );
}
