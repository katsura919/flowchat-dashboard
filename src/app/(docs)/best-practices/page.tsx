import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export default function BestPracticesPage() {
  return (
    <div>
      <PageHeader
        tag="Operations"
        title="Best Practices & VA Skills"
        description="Operational standards and skill requirements that determine long-term success. This section covers how the VA should think, act, and communicate — not just what to click."
      />

      <section className="space-y-10">
        {/* Operational Best Practices */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Operational Best Practices
          </h2>

          <div className="space-y-3">
            {[
              {
                title: "Explain WHY, not just WHAT",
                detail:
                  "When running walkthroughs or reporting to the client, explain the reason behind each action. This builds client trust and ensures the VA understands the logic — not just the steps.",
              },
              {
                title: "Pause at decision points",
                detail:
                  "When something unexpected happens — a restriction, an unusual reply, a low metric — stop and evaluate before taking action. Hasty decisions compound problems.",
              },
              {
                title: "Rotate templates regularly",
                detail:
                  "Add new message variations every 2–3 weeks. Platforms detect repeated patterns. Fresh copy protects account health and improves reply rates.",
              },
              {
                title: "Monitor account health daily",
                detail:
                  "Check for action blocks, messaging restrictions, or unusual drops in delivery before starting each day's activity. Do not wait for the client to notice.",
              },
              {
                title: "Maintain structured tracking",
                detail:
                  "Log acceptance rates, reply rates, and booking rates weekly in a shared document. Numbers without context are useless — add notes on what changed each week.",
              },
              {
                title: "Never ignore platform limitations",
                detail:
                  "Platform rules are not suggestions. A banned account cannot generate leads at all. Compliance is a non-negotiable operating condition.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border p-4 flex gap-4"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0 " />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VA Skill Focus Areas */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Skill Focus Areas
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Automation handles the pipeline. The VA&apos;s human skills
            determine whether leads convert. These are the competencies that
            separate average results from excellent ones.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                skill: "Rapport Building",
                desc: "Make the lead feel understood before making any ask. People buy from people they trust. Trust is built through genuine, personalized conversation.",
              },
              {
                skill: "Objection Handling",
                desc: "Leads will hesitate. Know the common objections for the client's offer and have prepared, natural-sounding responses ready.",
              },
              {
                skill: "Clear Positioning",
                desc: "Be able to explain the client's offer clearly and concisely in 1–2 sentences. If the lead does not understand the value quickly, they disengage.",
              },
              {
                skill: "Persuasion",
                desc: "Guide the lead toward action without pressure. Frame the call as a low-risk next step, not a high-stakes commitment.",
              },
              {
                skill: "Active Listening",
                desc: "Read what the lead actually says, not what you expect them to say. Adjust the conversation direction based on their words.",
              },
            ].map((item) => (
              <div key={item.skill} className="rounded-lg border bg-card p-4">
                <p className="font-semibold text-foreground text-sm">
                  {item.skill}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Callout type="tip" title="The Core Distinction">
          Automation is the system. Human communication is the conversion
          mechanism. The VA&apos;s technical setup creates the opportunity. The
          VA&apos;s conversational skill closes it.
        </Callout>

        {/* SOP Maintenance */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            SOP Maintenance
          </h2>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1.5">
            <p>
              <span className="font-medium text-foreground">Owner:</span>{" "}
              Operations / Training Team
            </p>
            <p>
              <span className="font-medium text-foreground">
                Review frequency:
              </span>{" "}
              Quarterly, or whenever FlowChat releases a platform update
            </p>
            <p>
              <span className="font-medium text-foreground">
                Update trigger:
              </span>{" "}
              Any change to platform rules, FlowChat features, or recurring
              compliance issues
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
