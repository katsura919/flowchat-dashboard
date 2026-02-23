'use client';

import * as React from 'react';
import { useAdminCertifications } from '@/hooks/certification';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, ShieldCheck, Clock, UserCheck, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { CertificationReviewSheet } from '@/components/admin/certification/review-sheet';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminCertificationPage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedVaId, setSelectedVaId] = React.useState<string | null>(null);
    const [isReviewOpen, setIsReviewOpen] = React.useState(false);

    const { data: certifications, isLoading } = useAdminCertifications();

    const filteredCertifications = certifications?.filter(cert => {
        const va = cert.vaId as any;
        const vaName = `${va?.firstName} ${va?.lastName}`.toLowerCase();
        const vaEmail = va?.email?.toLowerCase() || '';
        const search = searchQuery.toLowerCase();
        return vaName.includes(search) || vaEmail.includes(search);
    }) || [];

    const handleOpenReview = (vaId: string) => {
        setSelectedVaId(vaId);
        setIsReviewOpen(true);
    };

    const getStatusBadge = (cert: any) => {
        if (cert.isCertified) {
            return (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Certified
                </Badge>
            );
        }

        const inProgress = cert.phase1.completedCount > 0 || cert.phase2.completedCount > 0 || cert.phase3.completedCount > 0;

        if (inProgress) {
            return (
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20 gap-1">
                    <Clock className="h-3 w-3" />
                    In Progress
                </Badge>
            );
        }

        return (
            <Badge variant="outline" className="text-muted-foreground gap-1">
                <UserCheck className="h-3 w-3" />
                Pending
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">VA Certifications</h1>
                    <p className="text-muted-foreground mt-1">
                        Review and approve Virtual Assistants for live operations.
                    </p>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-9 bg-background/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border bg-background/30 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Virtual Assistant</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-24 rounded-full" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : filteredCertifications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                            No certifications found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCertifications.map((cert: any) => {
                                        const va = cert.vaId as any;
                                        return (
                                            <TableRow key={cert._id} className="hover:bg-muted/30 transition-colors group">
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{va?.firstName} {va?.lastName}</span>
                                                        <span className="text-xs text-muted-foreground">{va?.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(cert)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1.5 min-w-[120px]">
                                                        <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                                                            <span>PH1: {cert.phase1.completedCount}/{cert.phase1.totalCount}</span>
                                                            <span>PH2: {cert.phase2.completedCount}/{cert.phase2.totalCount}</span>
                                                            <span>PH3: {cert.phase3.completedCount}/{cert.phase3.totalCount}</span>
                                                        </div>
                                                        <div className="flex gap-1 h-1.5 w-full">
                                                            <div className={`h-full rounded-full bg-blue-500`} style={{ width: `${(cert.phase1.completedCount / cert.phase1.totalCount) * 33.3}%` }} />
                                                            <div className={`h-full rounded-full ${cert.phase2.isPassed ? 'bg-green-500' : 'bg-orange-400'}`} style={{ width: `${(cert.phase2.completedCount / cert.phase2.totalCount) * 33.3}%` }} />
                                                            <div className={`h-full rounded-full ${cert.phase3.isPassed ? 'bg-green-500' : 'bg-orange-400'}`} style={{ width: `${(cert.phase3.completedCount / cert.phase3.totalCount) * 33.3}%` }} />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {cert.updatedAt ? format(new Date(cert.updatedAt), 'MMM d, yyyy') : 'Never'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="gap-2 hover:bg-primary hover:text-primary-foreground group-hover:bg-muted"
                                                        onClick={() => handleOpenReview(va?._id)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Review
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <CertificationReviewSheet
                vaId={selectedVaId}
                isOpen={isReviewOpen}
                onClose={() => {
                    setIsReviewOpen(false);
                    setSelectedVaId(null);
                }}
            />
        </div>
    );
}
