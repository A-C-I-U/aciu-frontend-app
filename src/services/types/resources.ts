export interface Resource {
  id: string;
  file_name: string;
  file_description: string;
  file_size: number;
  file_format: string;
  file_url: string;
  access_level: string;
  createdBy: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    fullName: string;
    email: string;
  };
}

export type ResourcesResponse = Resource[];

export interface UploadResourceData {
  file: File;
  file_name: string;
  file_description: string;
  access_level: string;
}

export interface UploadResourceResponse {
  message: string;
}

export interface MeetingReportsResponse {
  category: string;
  count: number;
  resources: Resource[];
}