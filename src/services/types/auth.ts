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

export interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenPayload {
  refreshToken: string;
}


