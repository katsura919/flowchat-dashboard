"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthAdmin } from "@/hooks/auth-admin";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, token, fetchUser, isLoading } = useAuthAdmin();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // Small timeout to allow token from localStorage to hydrate if using hydration
            // but in Next.js CSR, it's instant if not inside SSR bound.

            if (!token) {
                router.push("/");
                return;
            }

            if (!user) {
                try {
                    await fetchUser();
                } catch {
                    router.push("/");
                }
            }
            setIsInitializing(false);
        };

        initAuth();
    }, [token, user, fetchUser, router]);

    if (!token || isInitializing || (!user && isLoading)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Prevent flash of content if user is still null even after initialization finishes (e.g., error fetching or redirecting)
    if (!user) return null;

    return <>{children}</>;
}
