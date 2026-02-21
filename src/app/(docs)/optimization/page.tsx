import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export default function OptimizationPage() {
  return (
    <div>
      <PageHeader
        tag="Operations"
        title="30-Day Optimization Review"
        description="After the first 30 days of running FlowChat, conduct a structured review of every key metric. Use this review to identify exactly where the pipeline is leaking and make targeted adjustments."
      />

      <Callout type="info" title="When to Run This Review">
        Run a full review at the end of each 30-day cycle. For active campaigns,
        also review key metrics weekly to catch problems early.
      </Callout>

      <section className="mt-8 space-y-10">
        {/* Metrics to Review */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Metrics to Review
          </h2>

          <div className="space-y-3">
            {[
              {
                metric: "Acceptance Rate",
                what: "Percentage of friend requests that were accepted.",
                target: "Healthy: above 20%",
                action:
                  "If low, change targeting. The audience does not recognize you or does not find you relevant.",
              },
              {
                metric: "Reply Rate",
                what: "Percentage of accepted leads who replied to the opening message.",
                target: "Healthy: above 15–20%",
                action:
                  "If low, rewrite the opening message. The hook is not compelling enough.",
              },
              {
                metric: "Booking Rate",
                what: "Percentage of replies that converted to a booked call.",
                target: "Highly variable — set a baseline and improve from it.",
                action:
                  "If low, review the nurture conversation. Qualification may be off or the transition is too abrupt.",
              },
              {
                metric: "Drop-off Stages",
                what: "Which pipeline stages are losing the most leads.",
                target: "No stage should lose more than 60–70% of leads.",
                action:
                  "Find the stage with the highest drop-off. That is where the next improvement is needed.",
              },
            ].map((item) => (
              <div key={item.metric} className="rounded-lg border bg-card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <p className="font-semibold text-foreground">{item.metric}</p>
                  <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                    {item.target}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {item.what}
                </p>
                <div className="mt-3 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    If low:{" "}
                  </span>
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Adjust */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            What to Adjust
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Every adjustment should be tied to a specific metric. Do not change
            multiple things at once — you will not know what worked.
          </p>

          <div className="rounded-lg border divide-y">
            {[
              {
                lever: "Message Hooks",
                when: "Reply rate is below target",
                action:
                  "Test a new opening line. Make it about the lead, not about you.",
              },
              {
                lever: "Follow-up Timing",
                when: "Leads are going cold between stages",
                action:
                  "Shorten the time between messages. Do not let the conversation go stale.",
              },
              {
                lever: "Audience Targeting",
                when: "Acceptance rate is declining",
                action:
                  "Review ICP. Find more relevant groups. Tighten qualification filters.",
              },
              {
                lever: "Call Invite Script",
                when: "Booking rate is low",
                action:
                  "Make the invite lower-pressure. Offer something specific. Remove friction.",
              },
            ].map((item) => (
              <div
                key={item.lever}
                className="px-4 py-4 grid sm:grid-cols-3 gap-2"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.lever}
                </p>
                <p className="text-xs text-muted-foreground sm:col-span-2">
                  <span className="font-medium text-foreground">When: </span>
                  {item.when}
                  <br />
                  <span className="font-medium text-foreground">Action: </span>
                  {item.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Callout type="tip" title="Review Mindset">
          Every number in the pipeline points to a specific lever. Low
          acceptance means wrong audience. Low reply means weak hook. Low
          booking means a conversation or trust problem. Follow the data.
        </Callout>
      </section>
    </div>
  );
}
