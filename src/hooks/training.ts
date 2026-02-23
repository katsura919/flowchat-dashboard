import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// --- Interfaces ---

export interface Module {
    slug: string;
    label: string;
    group: string;
    sopUrl?: string;
    order: number;
    completed: boolean;
    completedAt: string | null;
}

export interface TrainingProgress {
    _id: string;
    vaId: string;
    modules: Module[];
    completedCount: number;
    totalCount: number;
    progressPercent: number;
    updatedAt: string;
}

export interface CertificationItem {
    id: string;
    text: string;
    checked: boolean;
    checkedAt: string | null;
}

export interface CertificationPhase {
    items: CertificationItem[];
    completedCount: number;
    totalCount: number;
    isPassed: boolean | null;
}

export interface Certification {
    _id: string;
    vaId: string;
    phase1: CertificationPhase;
    phase2: CertificationPhase;
    phase3: CertificationPhase;
    isCertified: boolean;
    certifiedAt: string | null;
    reviewedBy: string | null;
    updatedAt: string;
}

// --- Static SOP Mapping ---

export const SOP_LINKS: Record<string, string> = {
    'm1': '/overview',
    'm2': '/va-role',
    'm3': '/day/3',
    'm4': '/day/1',
    'm5': '/day/2',
    'm6': '/day/3',
    'm7': '/day/4',
    'm8': '/optimization',
    'm9': '/compliance',
    'm10': '/setup',
    'm11': '/optimization',
    'm12': '/va-role',
    'm13': '/compliance',
    'm14': '/setup',
    'm15': '/optimization',
    'm16': '/optimization',
    'm17': '/setup',
};

// --- Query Keys ---

export const trainingKeys = {
    all: ['training'] as const,
    progress: () => [...trainingKeys.all, 'progress'] as const,
    certification: () => [...trainingKeys.all, 'certification'] as const,
};

// --- API Functions ---

const fetchTrainingProgress = async (): Promise<TrainingProgress> => {
    const { data } = await api.get('/va/training/me');
    return data;
};

const updateModuleStatus = async ({ slug, completed }: { slug: string; completed: boolean }): Promise<any> => {
    const { data } = await api.patch(`/va/training/me/modules/${slug}`, { completed });
    return data;
};

const fetchCertification = async (): Promise<Certification> => {
    const { data } = await api.get('/va/training/me/certification');
    return data;
};

// --- Hooks ---

export const useTrainingProgress = () => {
    return useQuery({
        queryKey: trainingKeys.progress(),
        queryFn: fetchTrainingProgress,
    });
};

export const useUpdateModuleStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateModuleStatus,
        onSuccess: () => {
            // Invalidate training progress so it refetches
            queryClient.invalidateQueries({ queryKey: trainingKeys.progress() });
        },
    });
};

export const useCertification = () => {
    return useQuery({
        queryKey: trainingKeys.certification(),
        queryFn: fetchCertification,
    });
};
