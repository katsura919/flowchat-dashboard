import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { EodReport } from './eod-reports';

export interface AdminEodFilters {
    startDate?: string;
    endDate?: string;
    vaId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface AdminEodSummary {
    totalLeadsImported: number;
    totalFriendRequestsSent: number;
    totalConversationsStarted: number;
    totalCallsBooked: number;
    totalNewReplies: number;
    reportCount: number;
}

export const useAdminEodReports = (filters: AdminEodFilters) => {
    return useQuery({
        queryKey: ['admin-eod-reports', filters],
        queryFn: async () => {
            const response = await api.get('/admin/reports/eod', { params: filters });
            return response.data;
        }
    });
};

export const useAdminEodSummary = (filters: Pick<AdminEodFilters, 'startDate' | 'endDate' | 'vaId'>) => {
    return useQuery({
        queryKey: ['admin-eod-summary', filters],
        queryFn: async () => {
            const response = await api.get('/admin/reports/eod/summary', { params: filters });
            return response.data.data as AdminEodSummary;
        }
    });
};
