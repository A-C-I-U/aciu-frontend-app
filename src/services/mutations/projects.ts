import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateProjectPayload, NominateProjectPayload, NominateProjectResponse, UpdateProjectStatusPayload } from '../types/projects';
import apiClient from '..';


const createProject = async ({ payload }: { 
  payload: CreateProjectPayload 
}): Promise<NominateProjectResponse> => {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('managedBy', payload.managedBy);
  formData.append('briefDescription', payload.briefDescription);
  formData.append('whyItMatters', payload.whyItMatters);
  formData.append('projectScope', payload.projectScope);
  formData.append('category', payload.category);
  formData.append('projectImpact', payload.projectImpact);
  formData.append('estimatedCostUSD', payload.estimatedCostUSD);
  if (payload.images) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }


  const response = await apiClient.post<{ message: string }>(
    "/projects", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )

  return response.data;

}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};


const nominateProject = async ({ payload }: {
  payload: NominateProjectPayload
}): Promise<NominateProjectResponse> => {
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
  const response = await apiClient.post<NominateProjectResponse>("/projects/nominate", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const useNominateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: nominateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};


const updateProjectStatus = ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateProjectStatusPayload;
}) => {
  return apiClient.patch(`/projects/${id}/status`, payload);
};


export const useUpdateProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectStatus,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
      queryClient.invalidateQueries({ queryKey: ["project-nominations"] });
    },
  });
};