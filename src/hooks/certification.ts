import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Certification } from './training';

// --- Query Keys ---
export const certificationKeys = {
    all: ['certification'] as const,
    adminList: () => [...certificationKeys.all, 'admin-list'] as const,
    vaDetail: (vaId: string) => [...certificationKeys.all, 'va-detail', vaId] as const,
};

// --- API Functions ---
const fetchAllCertifications = async (): Promise<Certification[]> => {
    const { data } = await api.get('/certification');
    return data;
};

const fetchVaCertification = async (vaId: string): Promise<Certification> => {
    const { data } = await api.get(`/certification/${vaId}`);
    return data;
};

const toggleCertItem = async ({
    vaId,
    phase,
    itemId,
    checked
}: {
    vaId: string;
    phase: string;
    itemId: string;
    checked: boolean;
}): Promise<any> => {
    const { data } = await api.patch(`/certification/${vaId}/items`, {
        phase,
        itemId,
        checked
    });
    return data;
};

// --- Hooks ---

/**
 * Hook for Admins to list all VA certifications
 */
export const useAdminCertifications = () => {
    return useQuery({
        queryKey: certificationKeys.adminList(),
        queryFn: fetchAllCertifications,
    });
};

/**
 * Hook for Admins to fetch a specific VA's certification checklist
 */
export const useVaCertificationDetail = (vaId: string | null) => {
    return useQuery({
        queryKey: certificationKeys.vaDetail(vaId || ''),
        queryFn: () => fetchVaCertification(vaId!),
        enabled: !!vaId,
    });
};

/**
 * Hook for Admins to toggle a checklist item
 */
export const useToggleCertItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleCertItem,
        onSuccess: (_, variables) => {
            // Invalidate the detail view for this VA
            queryClient.invalidateQueries({
                queryKey: certificationKeys.vaDetail(variables.vaId)
            });
            // Also invalidate the admin list to reflect overall status change
            queryClient.invalidateQueries({
                queryKey: certificationKeys.adminList()
            });
        },
    });
};
