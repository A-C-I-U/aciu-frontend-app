import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateProjectPayload, CreateProjectResponse } from '../types/projects';
import apiClient from '..';

const createProject = async (payload: CreateProjectPayload): Promise<CreateProjectResponse> => {
  const formData = new FormData();
  
  formData.append('title', payload.title);
  formData.append('category', payload.category);
  formData.append('location', payload.location);
  formData.append('briefDescription', payload.briefDescription);
  formData.append('expectedImpact', payload.expectedImpact);
  formData.append('estimatedCostUSD', payload.estimatedCostUSD);
  
  if (payload.image) {
    formData.append('image', payload.image);
  }

  const response = await apiClient.post<CreateProjectResponse>('/projects/nominate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};