export interface Project {
  id: string;
  branchId: string;
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: number;
  image: string;
  isCompleted: boolean;
  isApproved: boolean;
  createdBy: string;
  createdOn: string;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  donationStats: {
    totalDonated: number;
    targetAmount: number;
    percentageReached: number;
  };
  collectedFunds?: number;
}


export interface ProjectDetails {
  id: string;
  branchId: string;
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: number;
  image: string;
  isCompleted: boolean;
  isApproved: boolean;
  createdBy: string;
  createdOn: string;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface CreateProjectPayload {
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: string;
  image: File | null;
}

export interface CreateProjectResponse {
  message: string;
}

export interface RecommendedProject {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    briefDescription: string;
    image: string;
  };
  donationStats: {
    totalDonated: number;
    targetAmount: number;
    percentageReached: number;
  };
}

export interface ProjectRecommendationsResponse {
  recommendedProjects: RecommendedProject[];
}