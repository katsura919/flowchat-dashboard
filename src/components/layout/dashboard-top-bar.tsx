import { ThemeToggle } from "@/components/docs/theme-toggle";

interface DashboardTopBarProps {
    title: string;
}

export function DashboardTopBar({ title }: DashboardTopBarProps) {
    return (
        <header className="h-14 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-2.5">
                {/* Placeholder for Mobile Menu Toggle */}
                <span className="font-bold text-sm tracking-tight sm:hidden">{title}</span>
                <span className="font-semibold hidden sm:block">{title} Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>
        </header>
    );
}
