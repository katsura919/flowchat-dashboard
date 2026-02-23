import Link from "next/link";
import { Zap, LayoutDashboard, ClipboardList, MessageSquare } from "lucide-react";
import { DashboardTopBar } from "@/components/layout/dashboard-top-bar";
import { VaGuard } from "@/components/auth/va-guard";

export default function VALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <VaGuard>
            <div className="flex min-h-screen bg-background text-foreground">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-card flex flex-col hidden sm:flex">
                    <div className="h-14 flex items-center gap-2.5 px-6 border-b">
                        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <Link href="/" className="font-bold text-sm tracking-tight hover:text-primary transition-colors">
                            VA Portal
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        <Link
                            href="/va"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-muted text-foreground"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/va/eod"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                        >
                            <ClipboardList className="h-4 w-4" />
                            EOD Reports
                        </Link>
                        <Link
                            href="/va/training"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Training
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                    <DashboardTopBar title="VA" />
                    <div className="p-6 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </VaGuard>
    );
}
