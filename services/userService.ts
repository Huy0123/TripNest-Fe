import apiClient from "@/lib/api-client";

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    birthDate?: string;
}

export const userService = {
    getProfile: async () => {
        const response = await apiClient.get(`/users/me`);
        return response;
    },

    updateProfile: async (data: UpdateUserDto) => {
        const response = await apiClient.patch(`/users/me`, data);
        return response;
    },

    uploadAvatar: async (userId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await apiClient.patch(`/users/${userId}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    },

    getAllUsers: async (page: number, limit: number) => {
        const response = await apiClient.get(`/users`, { params: { page, limit } });
        return response;
    },

    getUserById: async (id: string) => {
        const response = await apiClient.get(`/users/${id}`);
        return response;
    },

    deleteUser: async (id: string) => {
        const response = await apiClient.delete(`/users/${id}`);
        return response;
    },

    updateUser: async (id: string, data: UpdateUserDto) => {
        const response = await apiClient.patch(`/users/${id}`, data);
        return response;
    }
};
