"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, UserCheck, Loader2, ArrowRight } from "lucide-react";

import { useAuthAdmin } from "@/hooks/auth-admin";
import { useAuthVa } from "@/hooks/auth-va";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface LoginDialogProps {
    children?: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
    const router = useRouter();

    // Dialog open state
    const [open, setOpen] = useState(false);

    // Admin and VA Zustand stores
    const { login: loginAdmin, isLoading: isAdminLoading, error: adminError } = useAuthAdmin();
    const { login: loginVa, isLoading: isVaLoading, error: vaError } = useAuthVa();

    // State for form fields
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [vaEmail, setVaEmail] = useState("");
    const [vaPassword, setVaPassword] = useState("");

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginAdmin({ email: adminEmail, password: adminPassword });
            setOpen(false);
            router.push("/admin"); // Adjust relative to actual destination
        } catch (err) {
            console.error("Admin login failed", err);
        }
    };

    const handleVaLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginVa({ email: vaEmail, password: vaPassword });
            setOpen(false);
            router.push("/va"); // Adjust relative to actual destination
        } catch (err) {
            console.error("VA login failed", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button variant="default" size="sm">Sign In</Button>}
            </DialogTrigger>

            {/* We make the dialog content wider and add some nice padding to match the previous vibe. */}
            <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-lg">
                {/* We can hide the default dialog header since we render our own header inside the tabs. Or we can keep it for screen readers. */}
                <div className="sr-only">
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>
                            Please sign in to access your FlowChat workspace.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="bg-muted/30 p-6 flex flex-col justify-center items-center">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-extrabold tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-muted-foreground text-xs">
                            Please sign in to access your workspace.
                        </p>
                    </div>

                    <Tabs defaultValue="va" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="va" className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4" /> Virtual Assistant
                            </TabsTrigger>
                            <TabsTrigger value="admin" className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" /> Administrator
                            </TabsTrigger>
                        </TabsList>

                        {/* VA Login Form */}
                        <TabsContent value="va" className="mt-0">
                            <Card className="border-muted shadow-sm rounded-lg">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg">VA Portal Login</CardTitle>
                                    <CardDescription className="text-xs">
                                        Enter your credentials to manage your assigned accounts.
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleVaLogin}>
                                    <CardContent className="space-y-4 pb-4">
                                        {vaError && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 dark:text-red-400 text-xs text-center">
                                                {vaError}
                                            </div>
                                        )}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="va-email" className="text-xs font-semibold">Email</Label>
                                            <Input
                                                id="va-email"
                                                type="email"
                                                placeholder="va@flowchat.com"
                                                required
                                                value={vaEmail}
                                                onChange={(e) => setVaEmail(e.target.value)}
                                                className="h-9 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="va-password" className="text-xs font-semibold">Password</Label>
                                            <Input
                                                id="va-password"
                                                type="password"
                                                required
                                                value={vaPassword}
                                                onChange={(e) => setVaPassword(e.target.value)}
                                                className="h-9 text-sm"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0">
                                        <Button type="submit" className="w-full h-10" disabled={isVaLoading}>
                                            {isVaLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In to VA Portal <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        {/* Admin Login Form */}
                        <TabsContent value="admin" className="mt-0">
                            <Card className="border-muted shadow-sm rounded-lg">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg">Admin Portal Login</CardTitle>
                                    <CardDescription className="text-xs">
                                        Sign in to manage your VAs, view reports, and configure rules.
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleAdminLogin}>
                                    <CardContent className="space-y-4 pb-4">
                                        {adminError && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 dark:text-red-400 text-xs text-center">
                                                {adminError}
                                            </div>
                                        )}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="admin-email" className="text-xs font-semibold">Email</Label>
                                            <Input
                                                id="admin-email"
                                                type="email"
                                                placeholder="admin@flowchat.com"
                                                required
                                                value={adminEmail}
                                                onChange={(e) => setAdminEmail(e.target.value)}
                                                className="h-9 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="admin-password" className="text-xs font-semibold">Password</Label>
                                            <Input
                                                id="admin-password"
                                                type="password"
                                                required
                                                value={adminPassword}
                                                onChange={(e) => setAdminPassword(e.target.value)}
                                                className="h-9 text-sm"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0">
                                        <Button type="submit" className="w-full h-10" variant="default" disabled={isAdminLoading}>
                                            {isAdminLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In as Administrator <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <p className="text-center text-[10px] text-muted-foreground mt-4">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-foreground">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-foreground">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
