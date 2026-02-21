import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export default function Day1Page() {
  return (
    <div>
      <PageHeader
        day={1}
        title="FlowChat Overview & Strategy Alignment"
        description="The objective of Day 1 is to align the client with the 4-step FlowChat system before any technical setup begins."
      />

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Introduce FlowChat
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Open the session by framing what FlowChat is and what it is not. The
            client needs a clear mental model before any pipeline setup or
            automation is shown.
          </p>

          <div className="rounded-lg border bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground mb-1">
              Opening Statement
            </p>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              &ldquo;FlowChat is a structured messaging system that turns
              conversations into booked calls and closed deals.&rdquo;
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            {[
              {
                label: "Simple",
                desc: "The system works through defined stages. No guesswork.",
              },
              {
                label: "Repeatable",
                desc: "The same process runs for every lead, every time.",
              },
              {
                label: "Scalable",
                desc: "More leads follow the same structure. Volume increases without chaos.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <p className="font-semibold text-sm text-primary">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            The 4-Step Map
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Walk the client through each step clearly before moving to the next.
            Do not rush.
          </p>

          <div className="space-y-3">
            {[
              {
                step: "01",
                label: "Import Leads",
                detail:
                  "Pull targeted contacts from Facebook groups and other sources. Quality of leads determines quality of conversations.",
              },
              {
                step: "02",
                label: "Start Conversations",
                detail:
                  "Send personalized friend requests followed by a custom opening message once accepted.",
              },
              {
                step: "03",
                label: "Book Calls",
                detail:
                  "Move the conversation through nurture stages. Ask qualifying questions. Invite qualified leads to a call.",
              },
              {
                step: "04",
                label: "Close Deals",
                detail:
                  "The client handles the sales call. The VA ensures the pipeline stays full and well-managed.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-lg border bg-card p-4 flex items-start gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {s.step}
                </span>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Callout type="info" title="Key Clarification for the Client">
          This is not spam. Every message is personalized and human-like. The
          system is fully implementable within 30 days when followed
          consistently.
        </Callout>

        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Confirm Understanding
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Before ending Day 1, ask the client to explain the flow back to you
            in their own words. Do not proceed to Day 2 until the client can
            accurately describe all four steps and the purpose of the system.
          </p>

          <Callout type="warning" title="Gate Requirement">
            The client must explain the 4-step flow back to the VA before any
            technical setup begins. This ensures the client understands what
            they are committing to.
          </Callout>
        </div>
      </section>
    </div>
  );
}
