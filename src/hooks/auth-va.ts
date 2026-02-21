import { create } from 'zustand';
import api from '@/lib/api';

interface VAUser {
    _id: string;
    name: string;
    email: string;
    role?: string;
    status?: string;
    assignedAdminId?: any;
    [key: string]: any;
}

interface AuthVaState {
    user: VAUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: any) => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthVa = create<AuthVaState>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isLoading: false,
    error: null,

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/va/login', credentials);
            const { token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', 'va');
            set({ token, isLoading: false });

            // Fetch user profile after login
            useAuthVa.getState().fetchUser();
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false
            });
            throw error;
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/auth/va/me');
            set({ user: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch user',
                isLoading: false
            });
            // Optionally handle token expiration by logging out
            // useAuthVa.getState().logout();
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        set({ user: null, token: null, error: null });
    },

    clearError: () => set({ error: null }),
}));
