import apiClient from "..";
import type { UploadResourceData, UploadResourceResponse, UploadResourceType } from "../types/resources";
import { useMutation, useQueryClient } from '@tanstack/react-query';


const uploadResource = async ({ type, data }: {type: UploadResourceType , data: UploadResourceData }): Promise<UploadResourceResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('file_name', data.file_name);
  formData.append('file_description', data.file_description);
  formData.append('access_level', data.access_level);

  const response = await apiClient.post<UploadResourceResponse>(`/resources/upload/${type}`, formData, { headers: {
      'Content-Type': 'multipart/form-data',
    }});
  return response.data;
};

export const useUploadResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResource,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [variables.type],
      });

    },
  });
};


export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, fileName, fileDescription }: { id: string; fileName: string; fileDescription: string }) => {
      const response = await apiClient.patch(`/resources/${id}`, { file_name: fileName, file_description: fileDescription });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aciu-resources'] });
      queryClient.invalidateQueries({ queryKey: ['meeting-reports'] });
      queryClient.invalidateQueries({ queryKey: ['resource', variables.id] });
    },
  });
};

const archiveResource = ({
  id,
}: {
  id: string;
}) => {
  return apiClient.patch(`/resources/${id}/archive`);
};


export const useArchiveResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveResource,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aciu-resources'] });
      queryClient.invalidateQueries({ queryKey: ['meeting-reports'] });
      queryClient.invalidateQueries({ queryKey: ['resource', variables.id] });
    }
  })
}

export const useDownloadResource = () => {
  return useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await apiClient.get(
        `/resources/${resourceId}/download`
      );

      return response.data;
    },
  });
};