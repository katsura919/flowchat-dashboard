import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// --- Interfaces ---

export interface VA {
    _id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'suspended';
    trainingStatus: 'not_started' | 'in_progress' | 'completed';
    isCertified: boolean;
    assignedAdminId: string | { _id: string; name: string; email: string };
    createdAt: string;
}

export interface GetVAsResponse {
    data: VA[];
    metadata: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface GetVAsParams {
    page?: number;
    limit?: number;
    search?: string;
    filter?: 'all' | 'my';
}

export interface CreateVAPayload {
    name: string;
    email: string;
    password?: string;
}

export interface UpdateVAPayload {
    status?: 'active' | 'inactive' | 'suspended';
    assignedAdminId?: string;
}

// --- Query Keys ---

export const vaKeys = {
    all: ['vas'] as const,
    lists: () => [...vaKeys.all, 'list'] as const,
    list: (params: GetVAsParams) => [...vaKeys.lists(), params] as const,
    details: () => [...vaKeys.all, 'detail'] as const,
    detail: (id: string) => [...vaKeys.details(), id] as const,
};

// --- API Functions ---

const fetchVAs = async (params: GetVAsParams): Promise<GetVAsResponse> => {
    const { data } = await api.get('/admin/vas', { params });
    return data;
};

const fetchVAById = async (id: string): Promise<VA> => {
    const { data } = await api.get(`/admin/vas/${id}`);
    return data;
};

const createVA = async (payload: CreateVAPayload): Promise<{ message: string; va: Partial<VA> }> => {
    const { data } = await api.post('/admin/vas', payload);
    return data;
};

const updateVAStatus = async ({ id, payload }: { id: string; payload: UpdateVAPayload }): Promise<{ message: string; va: Partial<VA> }> => {
    const { data } = await api.patch(`/admin/vas/${id}`, payload);
    return data;
};


// --- Hooks ---

export const useVAs = (params: GetVAsParams) => {
    return useQuery({
        queryKey: vaKeys.list(params),
        queryFn: () => fetchVAs(params),
    });
};

export const useVA = (id: string) => {
    return useQuery({
        queryKey: vaKeys.detail(id),
        queryFn: () => fetchVAById(id),
        enabled: !!id,
    });
};

export const useCreateVA = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVA,
        onSuccess: () => {
            // Invalidate the VA lists so the new VA is fetched
            queryClient.invalidateQueries({ queryKey: vaKeys.lists() });
        },
    });
};

export const useUpdateVAStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateVAStatus,
        onSuccess: (_, variables) => {
            // Invalidate the specific VA cache and the list cache
            queryClient.invalidateQueries({ queryKey: vaKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: vaKeys.lists() });
        },
    });
};
