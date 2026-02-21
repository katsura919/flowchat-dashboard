import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dailySteps = [
  "Import new qualified leads into the CRM and assign them to the correct stage.",
  "Send warm, personalised outreach messages — spaced throughout the day, never blasted.",
  "Follow up with leads who haven't replied within 48 hours.",
  "Move leads through the pipeline as conversations progress.",
  "Archive stale leads (21+ days with no response) to keep the inbox clean.",
  "Confirm or reschedule any bookings and sync the calendar.",
  "Submit the Daily Operations Report at the end of each working day.",
];

const whatVaDoes = [
  {
    title: "Lead Outreach",
    description:
      "Sends personalised first messages to qualified prospects on your behalf, following your approved templates and tone.",
  },
  {
    title: "Follow-Up Sequences",
    description:
      "Systematically follows up with warm leads at set intervals — 48-hour check-ins, 7-day re-engagement — to keep conversations alive without being pushy.",
  },
  {
    title: "Booking Coordination",
    description:
      "Moves interested leads from conversation to booked call, confirming availability and sending calendar links.",
  },
  {
    title: "Pipeline Management",
    description:
      "Keeps your CRM accurate by updating lead stages, archiving dead leads, and ensuring no one falls through the cracks.",
  },
];

const protectionRules = [
  "Daily message volume is capped to stay within safe platform limits.",
  "Messages are spaced throughout the day — not sent all at once.",
  "Templates are rotated regularly to avoid triggering spam detection.",
  "Any warning from Facebook (restrictions, slow-down notices) triggers an immediate pause and report.",
];

const flaggedSteps = [
  {
    step: "1",
    title: "Your VA pauses outreach immediately",
    detail: "No messages are sent until the account status is reviewed.",
  },
  {
    step: "2",
    title: "You receive a same-day report",
    detail:
      "The VA documents what happened, when it happened, and any suspected cause.",
  },
  {
    step: "3",
    title: "Recovery plan is activated",
    detail:
      "The account enters a rest period. Outreach resumes at reduced volume only after the warning clears.",
  },
  {
    step: "4",
    title: "Root cause is addressed",
    detail:
      "Templates, volume settings, or timing are adjusted before full activity resumes.",
  },
];

const clientHelps = [
  "Keep your Facebook profile active and complete — a dormant profile increases flag risk.",
  "Respond to your VA's daily report promptly so any blockers can be cleared quickly.",
  "Let your VA know about any calendar changes at least 24 hours before a scheduled call.",
  "Do not send bulk messages or automated DMs from the same account your VA manages.",
  "If you receive an unusual notification from Facebook, screenshot it and share it with your VA right away.",
];

export default function ClientGuidePage() {
  return (
    <div>
      <PageHeader
        tag="Client Resources"
        title="Client Quick-Start Guide"
        description="A simple overview of how your FlowChat VA operates, what to expect each day, and how to get the best results from the system."
      />

      {/* What Your VA Is Doing */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          What Your VA Is Doing
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Your Virtual Assistant manages your Facebook outreach pipeline
          end-to-end. Here is a breakdown of the four core activities happening
          on your account every day.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {whatVaDoes.map((item) => (
            <Card key={item.title} className="shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Daily System */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          The Daily System
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Your VA follows the same structured routine every working day to keep
          your pipeline moving consistently.
        </p>
        <ol className="space-y-3">
          {dailySteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                {idx + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed pt-0.5">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Account Protection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Account Protection
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Keeping your Facebook account safe is the highest priority. Your VA
          follows strict protocols to minimise restriction risk.
        </p>
        <div className="rounded-lg border divide-y">
          {protectionRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 px-4 py-3.5">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <p className="text-sm text-foreground leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* If Account Gets Flagged */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          If Your Account Gets Flagged
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Occasional platform warnings can happen even with disciplined
          outreach. Here is exactly what happens when one occurs.
        </p>
        <div className="space-y-3">
          {flaggedSteps.map((item) => (
            <div key={item.step} className="flex gap-4 rounded-lg border p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How You Can Help */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          How You Can Help
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          The best results come from a smooth partnership. A few simple habits
          on your end make a significant difference.
        </p>
        <ul className="space-y-3">
          {clientHelps.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="text-sm text-foreground leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <Callout type="tip" title="Your Daily Operations Report">
        Your VA submits a structured report at the end of every working day
        covering messages sent, leads moved, bookings confirmed, account health,
        and any blockers. If you ever have questions about the day's activity,
        that report is the best place to start.
      </Callout>
    </div>
  );
}
