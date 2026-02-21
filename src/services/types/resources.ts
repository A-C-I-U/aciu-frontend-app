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

export interface ResourceResponse {
  success: boolean;
  resource: Resource;
}

export interface UploadResourceData {
  file: File;
  file_name: string;
  file_description: string;
  access_level: string;
}

export interface UploadResourceResponse {
  success: boolean;
  message: string;
  resources: ACIUResource;
}


export interface ResourceApiResponse {
  message: string;
  resources: ACIUResource[];
  count: number
}

export interface ACIUResource {
  id: string;
  createdAt: string;
  updatedAt: string;
  file_name: string;
  file_description: string;
  file_size: number;
  file_format: string;
  file_url: string;
  access_level: AccessLevel;
  createdBy: string;
  category: ResourceCategory;
  archived: boolean;
}

export type ResourceCategory =
  | 'meeting-reports'
  | 'aciu-resources';

export type AccessLevel = 'all_members' | 'only_admins';

export type UploadResourceType = 'aciu-resources' | 'meeting-reports'