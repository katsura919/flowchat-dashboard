import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Checklist } from "@/components/docs/checklist";

export default function CompliancePage() {
  return (
    <div>
      <PageHeader
        tag="VA Setup"
        title="Compliance & Platform Limits"
        description="FlowChat operates within platform rules. Violating these rules risks temporary blocks, messaging restrictions, or a permanent ban. The VA is responsible for maintaining account health at all times."
      />

      <Callout type="danger" title="Non-Negotiable">
        Account health is a long-term asset. One week of reckless activity can
        set back months of progress. Never prioritize volume over compliance.
      </Callout>

      <section className="mt-8 space-y-10">
        {/* Friend Request Limits */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Friend Request Limits
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Facebook imposes daily and weekly limits on friend requests.
            Exceeding these — or accumulating a low acceptance rate — triggers
            automated restrictions.
          </p>

          <Checklist
            do={[
              "Send friend requests gradually, not in bulk",
              "Monitor acceptance rate weekly",
              "Remove pending requests after 3 weeks (set up the automatic rule)",
              "Keep acceptance rate healthy — aim for above 20%",
              "Change targeting audience if acceptance rate keeps dropping",
            ]}
            dont={[
              "Send high volume immediately after account setup",
              "Ignore a declining acceptance rate",
              "Leave stale pending requests for months",
            ]}
          />

          <Callout type="warning" title="Low Acceptance Rate">
            If acceptance rate drops consistently, stop and change your
            targeting criteria before sending any more requests. The audience is
            wrong, not the volume.
          </Callout>
        </div>

        {/* Messaging Restrictions */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Messaging Restrictions
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Identical messages sent at high volume are flagged as spam.
            Facebook&apos;s algorithm detects repeated patterns. Vary the
            content and tone consistently.
          </p>

          <Checklist
            do={[
              "Personalize the first line of every opening message",
              "Rotate message templates regularly",
              "Keep tone conversational and natural",
              "Adjust scripts based on replies and engagement",
            ]}
            dont={[
              "Copy and paste the same script without changes",
              "Send spam-style bulk messages",
              "Lead with a long sales pitch in the first message",
            ]}
          />

          <div className="mt-4 rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-semibold text-foreground mb-2">
              If a messaging restriction occurs:
            </p>
            <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>Pause all automation immediately</li>
              <li>Reduce daily messaging activity for 3–5 days</li>
              <li>Rewrite scripts before restarting</li>
              <li>
                Restart gradually — do not return to previous volume right away
              </li>
            </ol>
          </div>
        </div>

        {/* Account Health Monitoring */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Account Health Monitoring
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Watch for these signals daily. Early detection prevents minor issues
            from becoming permanent restrictions.
          </p>

          <div className="space-y-3">
            {[
              {
                signal: "Temporary action blocks",
                action:
                  "Pause all activity. Wait 24–48 hours before any action.",
              },
              {
                signal: "Messaging restrictions",
                action: "Stop automation. Reduce volume and rewrite scripts.",
              },
              {
                signal: "Friend request bans",
                action:
                  "Stop all requests. Review targeting and warm up the account gradually.",
              },
            ].map((item) => (
              <div
                key={item.signal}
                className="rounded-lg border p-4 flex gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {item.signal}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Long-Term Thinking">
            Compliance is what makes the system scalable. A healthy account
            running at 60% capacity for 6 months outperforms a restricted
            account every time.
          </Callout>
        </div>
      </section>
    </div>
  );
}
