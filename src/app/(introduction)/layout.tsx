import { Sidebar } from "@/components/docs/sidebar";
import { MobileNav } from "@/components/docs/mobile-nav";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function IntroductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MobileNav />
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <Link href="/" className="font-bold text-sm tracking-tight">
                FlowChat SOP
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl">
        <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r py-8 pl-4 pr-4">
          <Sidebar />
        </aside>

        <main className="flex-1 min-w-0 px-6 py-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
