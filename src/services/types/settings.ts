interface Profile {
  email: string;
  fullName: string;
  ageGrade: string;
  branch: string;
  occupation: string;
  phoneNumber: string;
  profilePhoto: string;
  isVerified: boolean;
}

interface Notifications {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newsUpdates: boolean;
  importantNotifications: boolean;
  criticalAlerts: boolean;
  transactionUpdates: boolean;
  commentReplies: boolean;
  newPosts: boolean;
}

interface Security {
  mfaEnabled: boolean;
  mfaType: string;
}

export interface UserSettings {
  profile: Profile;
  notifications: Notifications;
  security: Security;
}

export interface UpdateProfilePayload {
  // ageGrade: string;
  // branch: string;
  occupation: string;
  phone: string;
  // fullName: string;
}

export interface UpdateProfileResponse {
  message: string;
}

export interface UpdateNotificationsPayload {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newsUpdates: boolean;
  importantNotifications: boolean;
  criticalAlerts: boolean;
  transactionUpdates: boolean;
  commentReplies: boolean;
  newPosts: boolean;
}

export interface UpdateNotificationsResponse {
  message: string;
}

export interface UpdateSecurityPayload {
  mfaEnabled: boolean;
}

export interface UpdateSecurityResponse {
  message: string;
}


export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}