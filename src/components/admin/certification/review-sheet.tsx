'use client';

import * as React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useVaCertificationDetail, useToggleCertItem } from '@/hooks/certification';
import { format } from 'date-fns';
import { CheckCircle2, Circle, AlertCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewSheetProps {
    vaId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function CertificationReviewSheet({ vaId, isOpen, onClose }: ReviewSheetProps) {
    const { data: cert, isLoading } = useVaCertificationDetail(vaId);
    const toggleMutation = useToggleCertItem();

    const handleToggle = async (phase: string, itemId: string, currentChecked: boolean) => {
        if (!vaId) return;

        try {
            await toggleMutation.mutateAsync({
                vaId,
                phase,
                itemId,
                checked: !currentChecked
            });
            toast.success('Checklist updated');
        } catch (error) {
            toast.error('Failed to update item');
        }
    };

    const renderPhase = (name: string, phaseKey: string, phaseData: any) => {
        if (!phaseData) return null;

        const isPassed = phaseKey === 'phase1' ? null : phaseData.isPassed;

        return (
            <div className="space-y-4 pt-4 first:pt-0">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">
                            {phaseData.completedCount} / {phaseData.totalCount}
                        </span>
                        {isPassed === true && (
                            <Badge variant="outline" className="h-5 px-1.5 flex items-center gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                                <CheckCircle2 className="h-3 w-3" />
                                Passed
                            </Badge>
                        )}
                        {isPassed === false && (
                            <Badge variant="outline" className="h-5 px-1.5 flex items-center gap-1 text-muted-foreground">
                                <Circle className="h-3 w-3" />
                                Pending
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="space-y-3 pl-1">
                    {phaseData.items.map((item: any) => (
                        <div key={item.id} className="flex items-start gap-3 group">
                            <Checkbox
                                id={item.id}
                                checked={item.checked}
                                onCheckedChange={() => handleToggle(phaseKey, item.id, item.checked)}
                                className="mt-0.5"
                                disabled={toggleMutation.isPending}
                            />
                            <div className="grid gap-0.5">
                                <label
                                    htmlFor={item.id}
                                    className={`text-sm leading-none font-medium cursor-pointer ${item.checked ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground transition-colors'}`}
                                >
                                    {item.text}
                                </label>
                                {item.checkedAt && (
                                    <span className="text-[10px] text-muted-foreground">
                                        Checked on {format(new Date(item.checkedAt), 'MMM d, h:mm a')}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="sm:max-w-md flex flex-col h-full bg-card border-l shadow-2xl">
                <SheetHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle>VA Certification Review</SheetTitle>
                        {cert?.isCertified && (
                            <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Certified
                            </Badge>
                        )}
                    </div>
                    <SheetDescription>
                        Conduct a technical and performance review for {(cert?.vaId as any)?.firstName || 'Virtual Assistant'}.
                    </SheetDescription>
                </SheetHeader>

                <Separator />

                <div className="flex-1 overflow-hidden">
                    {isLoading ? (
                        <div className="p-6 space-y-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-4 w-32" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ScrollArea className="h-full pr-4 py-6">
                            <div className="space-y-8 divide-y divide-border/50">
                                {renderPhase("Phase 1: Onboarding", "phase1", cert?.phase1)}
                                {renderPhase("Phase 2: Technical Review", "phase2", cert?.phase2)}
                                {renderPhase("Phase 3: Live Performance", "phase3", cert?.phase3)}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <div className="pt-4 border-t mt-auto">
                    <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="text-xs text-muted-foreground leading-relaxed">
                            <p className="font-semibold text-foreground mb-1">Certification Logic</p>
                            A VA is automatically certified once all items in Phase 2 are completed and at least 4 items in Phase 3 are verified.
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
