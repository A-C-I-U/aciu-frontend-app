import apiClient, { setAuthTokens, clearAuthTokens, setAuthToken } from '@/services';
import type { SignUpResponse, SignUpPayload, LoginResponse, LoginPayload, RefreshTokenPayload, RefreshTokenResponse, VerifyOtpPayload, VerifyOtpResponse, SignUpCompletePayload,} from '@/services/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await apiClient.post<SignUpResponse>('/auth/signup', payload);
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpPayload>({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const response = await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', payload);
      return response.data;
    },
  });
};

export const useSignUpComplete = () => {
  return useMutation<any, Error, SignUpCompletePayload>({
    mutationFn: async (payload: SignUpCompletePayload) => {
      const response = await apiClient.post<any>('/auth/signupComplete', payload);
      return response.data;
    },
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

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
      window.location.href = '/login';
    },
  });
};

