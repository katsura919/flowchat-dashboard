"use client"
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthAdmin } from "@/hooks/auth-admin";
import { useRouter } from "next/navigation";

interface DashboardTopBarProps {
    title: string;
}

export function DashboardTopBar({ title }: DashboardTopBarProps) {
    const { logout } = useAuthAdmin();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="h-14 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-2.5">
                {/* Placeholder for Mobile Menu Toggle */}
                <span className="font-bold text-sm tracking-tight sm:hidden">{title}</span>
                <span className="font-semibold hidden sm:block">{title} Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                </Button>
            </div>
        </header>
    );
}
