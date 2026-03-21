import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { userService, UpdateUserDto } from '@/services/userService';


export function useUpdateProfile() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProfile = async (data: UpdateUserDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.updateProfile(data);
      const result = (response as any)?.data || response;
      await mutate('/users/me');
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Cập nhật thông tin thất bại');
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
}

export function useUploadAvatar() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadAvatar = async (userId: string, file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.uploadAvatar(userId, file);
      const result = (response as any)?.data || response;
      await mutate('/users/me');
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Upload ảnh đại diện thất bại');
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadAvatar, isLoading, error };
}
