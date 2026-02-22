import { useUser } from '@/context/UserContext';
import apiClient, { setAuthTokens, clearAuthTokens, setAuthToken } from '@/services';
import type {
  SignUpResponse, SignUpPayload, LoginResponse, LoginPayload,
  RefreshTokenPayload, RefreshTokenResponse,
  VerifyOtpPayload, VerifyOtpResponse,
  CompleteSignUpPayload, CompleteSignUpResponse,
  ForgotPasswordPayload, ForgotPasswordResponse,
  VerifyPasswordResetOtpPayload, VerifyPasswordResetOtpResponse,
  ResetPasswordPayload, ResetPasswordResponse
} from '@/services/types/auth';
import type { User } from '@/utils/types';
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

export const useCompleteSignUp = () => {
  return useMutation<CompleteSignUpResponse, Error, CompleteSignUpPayload>({
    mutationFn: async (payload: CompleteSignUpPayload) => {
      const response = await apiClient.post<CompleteSignUpResponse>('/auth/signupComplete', payload);
      return response.data;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
      return response.data;
    },
  });
};

export const useVerifyPasswordResetOtp = () => {
  return useMutation<VerifyPasswordResetOtpResponse, Error, VerifyPasswordResetOtpPayload>({
    mutationFn: async (payload: VerifyPasswordResetOtpPayload) => {
      const response = await apiClient.post<VerifyPasswordResetOtpResponse>('/auth/verify-password-reset-otp', payload);
      return response.data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', payload);
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