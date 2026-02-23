import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import api from '@/lib/api';

// --- Interfaces ---

export interface EodReport {
    _id: string;
    vaId: string;
    date: string;
    dailyNumbers: {
        newLeadsImported: number;
        friendRequestsSent: number;
        newConversationsStarted: number;
        nurtureResponsesSent: number;
        callsBooked: number;
    };
    pipelineMovement: {
        newReplies: number;
        pendingBookings: number;
        qualifiedAdded: number;
    };
    accountHealth: {
        status: "healthy" | "warning" | "blocked";
        warnings: string | null;
        actionTaken: string | null;
    };
    insights: {
        topGroup: string;
        commonObjection: string;
        winningHook: string;
        recommendations: string;
    };
    blockers: string | null;
    submittedAt: string;
}

// --- Hooks ---

export const useEodReports = () => {
    return useQuery({
        queryKey: ['eod-reports'],
        queryFn: async () => {
            const response = await api.get('/eod');
            return response.data.data as EodReport[];
        }
    });
};

export const useLatestEodReport = () => {
    return useQuery({
        queryKey: ['eod-reports', 'latest'],
        queryFn: async () => {
            const response = await api.get('/eod/latest');
            return response.data.data as EodReport;
        }
    });
};

export const useSubmitEod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (report: Omit<EodReport, "_id" | "vaId" | "submittedAt">) => {
            const response = await api.post('/eod', report);
            return response.data;
        },
        onSuccess: () => {
            toast.success("EOD Report submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ['eod-reports'] });
            queryClient.invalidateQueries({ queryKey: ['eod-reports', 'latest'] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || "Failed to submit EOD report";
            toast.error(message);
        }
    });
};
