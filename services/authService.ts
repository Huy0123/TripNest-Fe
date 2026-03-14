import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginResponse {
    success: boolean;
    statusCode: number;
    message: string;
    user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: number;
            avatar: string;
            role: string;
    };
};

// Client-side
export const authService = {
    register: async (data: RegisterData) => {
        const response = await apiClient.post(`/auth/register`, data);
        return response;
    },

    verifyAccount: async (data: {email: string, otp: string}) => {
        const response = await apiClient.post(`/auth/verify-account`, data);
        return response;
    },

    login: async (data: {email: string, password: string, rememberMe?: boolean}) => {
        const response = await apiClient.post<LoginResponse>(`/auth/login`, data);
        return response;
    },

    logout: async () => {
        const response = await apiClient.post(`/auth/logout`);
        return response;
    },

    googleLogin: async (idToken: string) => {
        const response = await apiClient.post(`/auth/google`, { idToken });
        return response;
    },

    resendOtp: async (data: {email: string}) => {
        const response = await apiClient.post(`/auth/resend-verification-email`, data)
        return response;
    },

    forgotPassword: async (data: { email: string }) => {
        const response = await apiClient.post(`/auth/forgot-password`, data);
        return response;
    },

    resetPassword: async (data: any) => {
        const response = await apiClient.post(`/auth/reset-password`, data);
        return response;
    },

    verifyResetPasswordOtp: async (data: { email: string, otp: string }) => {
        const response = await apiClient.post(`/auth/verify-forgot-password`, data);
        return response;
    }
};

// Server-side Fetch Functions
export const getMeServer = () => serverFetch("/user/me");