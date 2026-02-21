import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Checklist } from "@/components/docs/checklist";

const objections = [
  {
    trigger: '"What\'s the price?"',
    pivot:
      "\"Great question! It depends on a few factors, and I'd hate to give you the wrong number. That's exactly what the quick chat is for — to see if we can even help first. Does [Day] or [Day] work better?\"",
    note: null,
  },
  {
    trigger: '"Just send me the info."',
    pivot:
      '"Sure! I have a few resources — are you struggling more with [Pain A] or [Pain B]?"',
    followup:
      '"Got it. That resource will help, but most people have 2–3 questions after. Easier to just jump on a quick 5-minute sync?"',
    note: "After they answer, bridge to the call.",
  },
  {
    trigger: '"I\'m too busy."',
    pivot:
      '"Totally get it. Want me to circle back in 2 weeks? Or if solving [Pain] is urgent, I have one short slot on [Day]. Your call."',
    note: "Give them an out. It removes pressure and often gets a response.",
  },
  {
    trigger: '"Is this a bot?"',
    pivot:
      '"Nope! Just a human helping manage the inbox. Anything specific I can help you with?"',
    note: "Keep it light and direct. Do not over-explain.",
  },
];

export default function ScriptsPage() {
  return (
    <div>
      <PageHeader
        tag="Playbooks"
        title="Script Playbook"
        description="Verbatim language for handling the most common objections, transitions, and pivots. Use these as frameworks — always personalize for the specific lead and conversation."
      />

      {/* Tone Rules */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Tone Rules
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              rule: "Casual and professional",
              detail:
                "Sound like a real person having a conversation — not a corporate email.",
            },
            {
              rule: "Use their name",
              detail:
                "Use the lead's first name naturally. Not in every message, but enough to feel personal.",
            },
            {
              rule: "Keep messages short",
              detail:
                "No long paragraphs. One idea per message. Two to three sentences maximum.",
            },
            {
              rule: "No corporate language",
              detail:
                "Avoid phrases like 'synergy,' 'leverage,' 'touch base,' or 'circle back.' Sound human.",
            },
            {
              rule: "One question at a time",
              detail:
                "Never stack multiple questions. Ask one, wait, then respond to their answer.",
            },
            {
              rule: "Match their energy",
              detail:
                "If they are brief, be brief. If they are detailed, engage with detail.",
            },
          ].map((item) => (
            <div key={item.rule} className="rounded-lg border bg-card p-3.5">
              <p className="text-sm font-semibold text-foreground">
                {item.rule}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Objections */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Objection Handling Scripts
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          These are the four most common objections. Each has a tested pivot
          response. Never argue. Never push. Guide with questions.
        </p>

        <div className="space-y-4">
          {objections.map((obj) => (
            <div
              key={obj.trigger}
              className="rounded-lg border overflow-hidden"
            >
              <div className="bg-muted/50 px-4 py-3 border-b">
                <p className="text-sm font-semibold text-foreground">
                  Lead says: <span className="text-primary">{obj.trigger}</span>
                </p>
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded-md bg-muted/40 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Your Response
                  </p>
                  <p className="text-sm text-foreground leading-relaxed italic">
                    {obj.pivot}
                  </p>
                </div>
                {"followup" in obj && obj.followup && (
                  <div className="rounded-md bg-muted/20 px-4 py-3 border border-dashed">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      Follow-up after their answer
                    </p>
                    <p className="text-sm text-foreground leading-relaxed italic">
                      {obj.followup}
                    </p>
                  </div>
                )}
                {obj.note && (
                  <p className="text-xs text-muted-foreground italic">
                    {obj.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Scripts */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Transition Scripts (Stage 08 → 10)
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Use these when moving a qualified lead toward the booking link. Pick
          the style that fits the lead&apos;s energy — not a formula, a judgment
          call.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Permission Close
            </p>
            <p className="text-sm text-foreground italic leading-relaxed">
              &ldquo;Would you be open to a 15-minute call to see if it&apos;s a
              fit?&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Use when the lead is warm but slightly hesitant. Low pressure.
              Easy to say yes to.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Direct Close
            </p>
            <p className="text-sm text-foreground italic leading-relaxed">
              &ldquo;Based on what you shared, I&apos;m confident we can help.
              Here&apos;s the link: [Link]. Do any times work?&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Use when the lead has clearly confirmed pain and interest. Be
              direct, not shy.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            After Sending the Link — The Grab
          </p>
          <p className="text-sm text-foreground italic leading-relaxed">
            &ldquo;I&apos;ll drop the link here — but what&apos;s your best
            email? I&apos;ll send a calendar invite so we don&apos;t waste your
            time.&rdquo;
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Always capture email or phone immediately after sending the link.
            Check the calendar 2 hours later — if they have not booked, send one
            gentle reminder.
          </p>
        </div>
      </section>

      {/* DO NOT */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          DO NOT List
        </h2>
        <Checklist
          dont={[
            "Argue with a lead — ever",
            "Send the booking link twice without a response in between",
            "Answer deep technical or product questions in DMs — that is what the call is for",
            "Chase clearly unqualified leads — archive and move on",
            "Send a wall of text in a single message",
            "Use corporate language or buzzwords",
          ]}
        />
        <Callout type="warning" title="When in Doubt">
          If a conversation feels off or you are not sure how to respond, do not
          guess and do not go silent. Flag it for review before the next message
          is sent.
        </Callout>
      </section>
    </div>
  );
}
