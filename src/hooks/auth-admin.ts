import { create } from 'zustand';
import api from '@/lib/api';

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role?: string;
    [key: string]: any;
}

interface AuthAdminState {
    user: AdminUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthAdmin = create<AuthAdminState>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isLoading: false,
    error: null,

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/admin/login', credentials);
            const { token } = response.data;

            localStorage.setItem('token', token);
            set({ token, isLoading: false });

            // Fetch user profile after login
            useAuthAdmin.getState().fetchUser();
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false
            });
            throw error;
        }
    },

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/admin/register', userData);
            const { token } = response.data;

            localStorage.setItem('token', token);
            set({ token, isLoading: false });

            // Fetch user profile after register
            useAuthAdmin.getState().fetchUser();
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false
            });
            throw error;
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/auth/admin/me');
            set({ user: response.data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch user',
                isLoading: false
            });
            // Optionally handle token expiration by logging out
            // useAuthAdmin.getState().logout();
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, error: null });
    },

    clearError: () => set({ error: null }),
}));
