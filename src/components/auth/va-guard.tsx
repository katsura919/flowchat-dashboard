"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthVa } from "@/hooks/auth-va";
import { Loader2 } from "lucide-react";

export function VaGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, token, fetchUser, isLoading } = useAuthVa();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
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

    if (!user) return null;

    return <>{children}</>;
}
