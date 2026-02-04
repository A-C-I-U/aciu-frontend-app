import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import { type CreateBranchResponse, type CreateBranchPayload } from "../types/database";

const saveBranch = async ({
  payload,
  id,
}: {
  payload: CreateBranchPayload;
  id?: string;
}): Promise<CreateBranchResponse> => {
  const url = id ? `/database/branch/${id}` : `/database/branch`;
  const method = id ? "patch" : "post";

  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("branchType", payload.branchType);
  formData.append("branchCity", payload.branchCity);
  formData.append("branchCountry", payload.branchCountry);
  formData.append("meetingLocation", payload.meetingLocation);

  if (payload.branchLogo) {
    formData.append("branchLogo", payload.branchLogo);
  }

  const response = await apiClient.request<CreateBranchResponse>({
    url,
    method,
    data: formData,
  });

  return response.data;
};

export const useSaveBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });
};
