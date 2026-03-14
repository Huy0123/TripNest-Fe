import apiClient from "@/lib/api-client";

export const tourDetailService = {
  uploadImages: async (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return apiClient.patch(`/tour-details/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadVideo: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.patch(`/tour-details/${id}/videos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteImage: async (id: string, publicId: string) => {
    return apiClient.delete(`/tour-details/${id}/images`, {
      data: { publicId },
    });
  },
};
