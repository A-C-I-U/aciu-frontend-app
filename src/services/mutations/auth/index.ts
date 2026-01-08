import { useUser } from '@/context/UserContext';
import apiClient, { setAuthTokens, clearAuthTokens, setAuthToken } from '@/services';
import type { SignUpResponse, SignUpPayload, LoginResponse, LoginPayload, RefreshTokenPayload, RefreshTokenResponse } from '@/services/types/auth';
import type { User } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await apiClient.post<SignUpResponse>('/signup', payload);
      return response.data;
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUser();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', payload);
      return response.data;
    },
    onSuccess: (data) => {
      setAuthTokens({
        accessToken: data.token.accessToken,
        refreshToken: data.token.refreshToken
      });

      const mappedUser: User = {
        name: data.token.user.fullName,
        occupation: data.token.user.occupation,
        phoneNumber: data.token.user.phone,
        email: data.token.user.email,
        ageGrade: data.token.user.ageGrade,
        branch: data.token.user.branch,
        role: data.token.user.role,
        verified: data.token.user.isVerified,
        gender: data.token.user.gender,
        profilePhoto: data.token.user.profilePhoto,
        village: data.token.user.village,
      };

      setUser(mappedUser)
      localStorage.setItem("user", JSON.stringify(mappedUser));
      
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
      clearAuthTokens();
    },
  });
};

//this is a manual token refresh mutation  i created this hook to refresh token when needed
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error, RefreshTokenPayload>({
    mutationFn: async (payload: RefreshTokenPayload) => {
      const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', payload);
      return response.data;
    },
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
    },
    onError: (error) => {
      console.error('Token refresh failed:', error);
      clearAuthTokens();
      localStorage.removeItem("user");
      window.location.href = '/login';
    },
  });
};


export const useLogout = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  return () => {
    clearAuthTokens();
    setUser(null);
    queryClient.clear();
    localStorage.removeItem("user");
    window.location.href = '/login';
  };
};