import useSWR from 'swr';
import { userService } from '@/services/userService';
import { User } from '@/types/user';

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/users/me',
    async () => {
      const response = await userService.getProfile();
      return (response as any)?.data || response;
    }
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
