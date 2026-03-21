import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { User } from "@/types/user";

export const userService = {
    getProfile: async (): Promise<User> => {
        return apiClient.get(`/users/me`);
    },

    updateProfile: async (data: any): Promise<User> => {
        return apiClient.patch(`/users/me`, data);
    },

    uploadAvatar: async (userId: string, file: File): Promise<User> => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.patch(`/users/me/avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    getAllUsers: async (page: number, limit: number): Promise<{ data: User[]; total: number }> => {
        return apiClient.get(`/users`, { params: { page, limit } });
    },

    getUserById: async (id: string): Promise<User> => {
        return apiClient.get(`/users/${id}`);
    },

    deleteUser: async (id: string): Promise<void> => {
        return apiClient.delete(`/users/${id}`);
    },

    updateUser: async (id: string, data: any): Promise<User> => {
    return apiClient.patch(`/users/${id}`, data);
  }
};

export const getUsersServer = (page = 1, limit = 10) => 
    serverFetch("/users", { query: { page, limit } });
    
export const getUserServer = (id: string) => serverFetch(`/users/${id}`);
