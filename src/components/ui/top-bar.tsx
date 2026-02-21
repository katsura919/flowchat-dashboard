"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/login-dialog";
import { useEffect, useState } from "react";

interface TopBarProps {
    showSignIn?: boolean;
}

export function TopBar({ showSignIn = false }: TopBarProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dashboardUrl, setDashboardUrl] = useState("/");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role) {
            setIsLoggedIn(true);
            setDashboardUrl(role === "admin" ? "/admin" : "/va");
        }
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                        <Zap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <Link href="/" className="font-bold text-sm tracking-tight hover:text-primary transition-colors">
                        FlowChat SOP
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {showSignIn && (
                        isLoggedIn ? (
                            <Link href={dashboardUrl}>
                                <Button size="sm" variant="default">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <LoginDialog>
                                <Button size="sm" variant="default">
                                    Sign In
                                </Button>
                            </LoginDialog>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}
