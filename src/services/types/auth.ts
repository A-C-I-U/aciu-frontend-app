export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    id: string;
    email: string;
    status: string;
  };
}

export interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface CompleteSignUpPayload {
  userId?: string;
  gender: string;
  branch: string;
  branchLocation: string;
  village: string;
  ageGrade: string;
  occupation: string;
}

export interface CompleteSignUpResponse {
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyPasswordResetOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetOtpResponse {
  message: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword?: string;
  confirmPassword?: string;
  password?: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


export type User = {
  id: string;
  branchId: string;
  profilePhoto: string | null;
  fullName: string;
  email: string;
  phone: string;
  role: "branch_admin" | "national_admin" | "member";
  isVerified: boolean;
  branch: string;
  branchLocation: string;
  nin: string;
  gender: string;
  village: string;
  ageGrade: string;
  occupation: string;
  status: "active" | "inactive" | string;
  verifiedOn: string | null;
  verifiedBy: string | null;
  verificationNote: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface RefreshTokenPayload {
  refreshToken: string;
}


