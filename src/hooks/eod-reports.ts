import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";

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

// --- Dummy Data ---

const DUMMY_REPORTS: EodReport[] = [
    {
        _id: "1",
        vaId: "va-123",
        date: new Date(Date.now() - 86400000).toISOString(),
        dailyNumbers: {
            newLeadsImported: 50,
            friendRequestsSent: 20,
            newConversationsStarted: 15,
            nurtureResponsesSent: 30,
            callsBooked: 2,
        },
        pipelineMovement: {
            newReplies: 10,
            pendingBookings: 5,
            qualifiedAdded: 8,
        },
        accountHealth: {
            status: "healthy",
            warnings: null,
            actionTaken: null,
        },
        insights: {
            topGroup: "SaaS Founders",
            commonObjection: "Price too high",
            winningHook: "Hey, I saw your post about scaling...",
            recommendations: "Focus on smaller groups",
        },
        blockers: null,
        submittedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        _id: "2",
        vaId: "va-123",
        date: new Date(Date.now() - 172800000).toISOString(),
        dailyNumbers: {
            newLeadsImported: 45,
            friendRequestsSent: 18,
            newConversationsStarted: 12,
            nurtureResponsesSent: 25,
            callsBooked: 1,
        },
        pipelineMovement: {
            newReplies: 8,
            pendingBookings: 3,
            qualifiedAdded: 6,
        },
        accountHealth: {
            status: "warning",
            warnings: "Account flagged for speed",
            actionTaken: "Slowed down interactions",
        },
        insights: {
            topGroup: "E-com Owners",
            commonObjection: "Not interested",
            winningHook: "I love your product design!",
            recommendations: "Try different hook",
        },
        blockers: "Limited by daily limits",
        submittedAt: new Date(Date.now() - 172800000).toISOString(),
    }
];

// --- Hooks ---

export const useEodReports = () => {
    return useQuery({
        queryKey: ['eod-reports'],
        queryFn: async () => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return DUMMY_REPORTS;
        }
    });
};

export const useSubmitEod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (report: Omit<EodReport, "_id" | "vaId" | "submittedAt">) => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Submitting report:", report);
            return { success: true };
        },
        onSuccess: () => {
            toast.success("EOD Report submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ['eod-reports'] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to submit EOD report");
        }
    });
};
