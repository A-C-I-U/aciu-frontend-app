import apiClient from "..";
import type { UploadResourceData, UploadResourceResponse } from "../types/resources";
import { useMutation, useQueryClient } from '@tanstack/react-query';


const uploadResource = async (data: UploadResourceData): Promise<UploadResourceResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('file_name', data.file_name);
  formData.append('file_description', data.file_description);
  formData.append('access_level', data.access_level);

  const response = await apiClient.post<UploadResourceResponse>('/resources/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useUploadResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};