"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitEod } from "@/hooks/eod-reports";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    BarChart3,
    TrendingUp,
    Activity,
    Lightbulb
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const eodFormSchema = z.object({
    date: z.string(),
    dailyNumbers: z.object({
        newLeadsImported: z.coerce.number().min(0),
        friendRequestsSent: z.coerce.number().min(0),
        newConversationsStarted: z.coerce.number().min(0),
        nurtureResponsesSent: z.coerce.number().min(0),
        callsBooked: z.coerce.number().min(0),
    }),
    pipelineMovement: z.object({
        newReplies: z.coerce.number().min(0),
        pendingBookings: z.coerce.number().min(0),
        qualifiedAdded: z.coerce.number().min(0),
    }),
    accountHealth: z.object({
        status: z.enum(["healthy", "warning", "blocked"]),
        warnings: z.string().optional(),
        actionTaken: z.string().optional(),
    }),
    insights: z.object({
        topGroup: z.string().min(1, "Top performing group is required"),
        commonObjection: z.string().min(1, "Common objection is required"),
        winningHook: z.string().min(1, "Winning hook is required"),
        recommendations: z.string().min(1, "Recommendations are required"),
    }),
    blockers: z.string().optional(),
});

type EodFormValues = z.infer<typeof eodFormSchema>;

const STEPS = [
    { id: "numbers", title: "Daily Numbers", icon: BarChart3 },
    { id: "pipeline", title: "Pipeline", icon: TrendingUp },
    { id: "health", title: "Health", icon: Activity },
    { id: "insights", title: "Insights", icon: Lightbulb },
];

export function EodForm({ onSuccess }: { onSuccess?: () => void }) {
    const [step, setStep] = useState(0);
    const submitMutation = useSubmitEod();

    const form = useForm<EodFormValues>({
        resolver: zodResolver(eodFormSchema) as any,
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            dailyNumbers: {
                newLeadsImported: 0,
                friendRequestsSent: 0,
                newConversationsStarted: 0,
                nurtureResponsesSent: 0,
                callsBooked: 0,
            },
            pipelineMovement: {
                newReplies: 0,
                pendingBookings: 0,
                qualifiedAdded: 0,
            },
            accountHealth: {
                status: "healthy",
                warnings: "",
                actionTaken: "",
            },
            insights: {
                topGroup: "",
                commonObjection: "",
                winningHook: "",
                recommendations: "",
            },
            blockers: "",
        },
    });

    const onSubmit = (values: EodFormValues) => {
        const payload = {
            ...values,
            accountHealth: {
                ...values.accountHealth,
                warnings: values.accountHealth.warnings || null,
                actionTaken: values.accountHealth.actionTaken || null,
            },
            blockers: values.blockers || null,
        };

        submitMutation.mutate(payload as any, {
            onSuccess: () => {
                form.reset();
                setStep(0);
                if (onSuccess) onSuccess();
            },
        });
    };

    const nextStep = async () => {
        const fields = getFieldsForStep(step);
        const isValid = await form.trigger(fields as any);
        if (isValid) {
            setStep((s) => Math.min(s + 1, STEPS.length - 1));
        }
    };

    const prevStep = () => {
        setStep((s) => Math.max(s - 1, 0));
    };

    const getFieldsForStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0: return ["dailyNumbers.newLeadsImported", "dailyNumbers.friendRequestsSent", "dailyNumbers.newConversationsStarted", "dailyNumbers.nurtureResponsesSent", "dailyNumbers.callsBooked"];
            case 1: return ["pipelineMovement.newReplies", "pipelineMovement.pendingBookings", "pipelineMovement.qualifiedAdded"];
            case 2: return ["accountHealth.status", "accountHealth.warnings", "accountHealth.actionTaken"];
            case 3: return ["insights.topGroup", "insights.commonObjection", "insights.winningHook", "insights.recommendations", "blockers"];
            default: return [];
        }
    };

    const progress = ((step + 1) / STEPS.length) * 100;
    const StepIcon = STEPS[step]?.icon;

    return (
        <Card className="border-none shadow-md bg-card/60 backdrop-blur-md overflow-hidden">
            <CardContent className="p-0">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-lg">
                                {StepIcon && <StepIcon className="h-5 w-5 text-primary-foreground" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{STEPS[step]?.title}</h3>
                                <p className="text-sm text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 w-8 rounded-full transition-all duration-300",
                                        i <= step ? "bg-primary" : "bg-primary/10"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <Progress value={progress} className="h-1 bg-primary/10" />
                </div>

                <div className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 0: Daily Numbers */}
                            {step === 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dailyNumbers.newLeadsImported"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Leads Imported</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dailyNumbers.friendRequestsSent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Friend Requests Sent</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dailyNumbers.newConversationsStarted"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Conversations Started</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dailyNumbers.nurtureResponsesSent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nurture Responses Sent</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dailyNumbers.callsBooked"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Calls Booked</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Step 1: Pipeline Movement */}
                            {step === 1 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="pipelineMovement.newReplies"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Replies (Stage 07)</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pipelineMovement.pendingBookings"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pending Bookings</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pipelineMovement.qualifiedAdded"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Qualified Leads Added</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Step 2: Account Health */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="accountHealth.status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Account Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="healthy">Healthy</SelectItem>
                                                        <SelectItem value="warning">Warning</SelectItem>
                                                        <SelectItem value="blocked">Blocked</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch("accountHealth.status") !== "healthy" && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="accountHealth.warnings"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Warnings Received</FormLabel>
                                                        <FormControl><Textarea {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="accountHealth.actionTaken"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Action Taken</FormLabel>
                                                        <FormControl><Textarea {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Insights & Blockers */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="insights.topGroup"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Top Performing Group</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="insights.commonObjection"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Common Objection</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="insights.winningHook"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Winning Hook</FormLabel>
                                                <FormControl><Textarea {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="insights.recommendations"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Recommendations</FormLabel>
                                                <FormControl><Textarea {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="blockers"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Blockers (Optional)</FormLabel>
                                                <FormControl><Textarea {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="flex justify-between pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={step === 0}
                                    className="gap-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                {step === STEPS.length - 1 ? (
                                    <Button
                                        type="submit"
                                        disabled={submitMutation.isPending}
                                        className="gap-2 px-8"
                                    >
                                        {submitMutation.isPending ? "Submitting..." : (
                                            <>
                                                Submit EOD Report
                                                <CheckCircle2 className="h-4 w-4 ml-1" />
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="gap-2"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
}
