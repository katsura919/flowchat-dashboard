import Link from "next/link";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import {
  BookOpen,
  UserCheck,
  ShieldAlert,
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Zap,
  TrendingUp,
  ClipboardList,
  FileText,
  Award,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  {
    icon: BookOpen,
    title: "SOP Growth Blueprint",
    description:
      "The master strategy doc — start here to understand the full FlowChat system.",
    href: "/blueprint",
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-300 dark:hover:border-violet-700",
  },
  {
    icon: UserCheck,
    title: "VA Role & Daily Rhythm",
    description: "Exactly what the VA does every day, hour by hour.",
    href: "/va-role",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-300 dark:hover:border-blue-700",
  },
  {
    icon: FileText,
    title: "Daily Operations Report",
    description: "Fill in and download your end-of-day report as a PDF.",
    href: "/report",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
  {
    icon: ClipboardList,
    title: "Weekly Growth Audit",
    description:
      "Every Friday — score pipeline health and plan the week ahead.",
    href: "/audit",
    accent: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    border: "hover:border-orange-300 dark:hover:border-orange-700",
  },
  {
    icon: MessageSquare,
    title: "Script Playbook",
    description: "Every message template and objection response the VA needs.",
    href: "/scripts",
    accent: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    border: "hover:border-pink-300 dark:hover:border-pink-700",
  },
  {
    icon: Award,
    title: "VA Certification",
    description: "Complete the checklist to become a certified FlowChat VA.",
    href: "/certification",
    accent: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    border: "hover:border-yellow-300 dark:hover:border-yellow-700",
  },
];

const allSections = [
  {
    label: "Getting Started",
    items: [
      { title: "SOP Growth Blueprint", href: "/blueprint", icon: BookOpen },
      { title: "VA Role & Daily Rhythm", href: "/va-role", icon: UserCheck },
      {
        title: "Platform Limits & Safety",
        href: "/limitations",
        icon: ShieldAlert,
      },
    ],
  },
  {
    label: "Client Walkthrough",
    items: [
      { title: "Overview & Purpose", href: "/overview", icon: LayoutDashboard },
      { title: "Client Quick-Start Guide", href: "/client-guide", icon: Users },
    ],
  },
  {
    label: "Daily Walkthrough",
    items: [
      { title: "Day 1 — Overview & Strategy", href: "/day/1", icon: Calendar },
      { title: "Day 2 — Lead Import & Logic", href: "/day/2", icon: Calendar },
      {
        title: "Day 3 — Messaging & Nurturing",
        href: "/day/3",
        icon: Calendar,
      },
      { title: "Day 4 — Automation & Scaling", href: "/day/4", icon: Calendar },
    ],
  },
  {
    label: "Growth System",
    items: [
      { title: "Maturity Roadmap", href: "/maturity", icon: TrendingUp },
      { title: "Weekly Growth Audit", href: "/audit", icon: ClipboardList },
      { title: "30-Day Optimization Review", href: "/optimization", icon: Zap },
    ],
  },
  {
    label: "Playbooks & Reports",
    items: [
      { title: "Script Playbook", href: "/scripts", icon: MessageSquare },
      { title: "Daily Operations Report", href: "/report", icon: FileText },
      { title: "Best Practices & Skills", href: "/best-practices", icon: Star },
    ],
  },
  {
    label: "VA Setup & Compliance",
    items: [
      { title: "Pre-Call Protocol", href: "/setup", icon: ClipboardList },
      { title: "Compliance & Limits", href: "/compliance", icon: ShieldAlert },
      {
        title: "VA Certification Checklist",
        href: "/certification",
        icon: Award,
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <Link href="/" className="font-bold text-sm tracking-tight">
              FlowChat SOP
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            The FlowChat
            <br className="hidden sm:block" /> Operating System
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
            Everything a Virtual Assistant and client needs to run a FlowChat
            account — from day-one setup to weekly audits, scripts, and reports.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blueprint"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start with the Blueprint <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/va-role"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
            >
              VA Onboarding Guide
            </Link>
          </div>
        </section>

        {/* Quick access cards */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all ${item.border} hover:shadow-sm`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.accent}`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All resources */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            All Resources
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allSections.map((section) => (
              <div
                key={section.label}
                className="rounded-xl border bg-card p-5"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  {section.label}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted/60 hover:text-primary transition-colors group"
                        >
                          <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 h-12 flex items-center">
          <p className="text-xs text-muted-foreground">
            FlowChat SOP — Internal resource for VAs and clients.
          </p>
        </div>
      </footer>
    </div>
  );
}
