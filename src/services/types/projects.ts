import { array, mixed, object, string } from "yup";

export type ProjectStatus = "approved" | "rejected";

export type UpdateProjectStatusPayload =
  | { approve: true }
  | { approve: false; reason: string };

export interface Project {
  id: string;
  branchId: string | null;
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: number;
  image: string | null;
  projectScope: string;
  projectImpact: string;
  whyItMatters: string;
  images: string[];
  isCompleted: boolean;
  isApproved: boolean;
  isNomination: boolean;
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
  fundStatus: {
    totalRaised: number;
    targetAmount: number;
    managedBy: string;
  };
  collectedFunds?: number;
}


export interface ProjectDetails {
  id: string;
  branchId: string | null;
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: number;
  image: string | null;
  projectScope: string;
  projectImpact: string;
  whyItMatters: string;
  images: string[];
  isCompleted: boolean;
  isApproved: boolean;
  createdBy: string;
  createdOn: string;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  fundStatus?: {
    totalRaised: number;
    targetAmount: number;
    managedBy: string;
  };
}


export interface NominateProjectPayload {
  title: string;
  category: string;
  location: string;
  briefDescription: string;
  expectedImpact: string;
  estimatedCostUSD: string;
  image: File | null;
}

export interface NominateProjectResponse {
  message: string;
}

export interface CreateProjectPayload {
  title: string;
  managedBy: string;
  location: string;
  briefDescription: string;
  whyItMatters: string;
  projectScope: string;
  category: string;
  projectImpact: string;
  estimatedCostUSD: string;
  images: File[] | string[] | null[];
}

export interface RecommendedProject {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    briefDescription: string;
    images: string[];
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

export interface ProjectDonation {
  DonorName: string;
  Amount: number;
  DaysAgo: number;
}

// export interface DonationPayload {
//   amountUSD: string;
//   anonymous: boolean;
//   remarks: string;
// }

// export interface StripeCheckoutResponse {
//   id: string; 
//   url: string; 
// }

export interface DonationPayload {
  amountUSD: string
  anonymous: boolean
  remarks: string
}

export interface PaymentIntentResponse {
  clientSecret: string
  paymentIntentId: string
  amount: number
  currency: string
}


export interface ProjectStat {
  count: number,
  growth: number
}

export interface ProjectStatsResponse {
  approvedProjects: ProjectStat,
  completedProjects: ProjectStat,
  ongoingProjects: ProjectStat,
  totalProjectDonations: {
    amount: number,
    growth: number
  }
}

export interface NominatedProject {
  id: string;
  projectId: string;
  submittedBy: string;
  date: string;
  estimatedCost: number;
  status: "pending" | "approved" | "rejected";
}


export interface ProjectNominationDetail {
  id: string;
  projectId: string;
  title: string;
  submittedBy: string;
  emailAddress: string;
  phoneNumber: string;
  branch: string;
  location: string;
  estimatedCostUSD: number;
  category: string;
  briefDescription: string;
  expectedImpact: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  image: string;
}

export const createProjectSchemas = [
  object({
    title: string().required("Project title is required"),
    managedBy: string().required("Project Assignee is required"),
    location: string().required("Location is required"),
    briefDescription: string().required("Project description is required"),
    whyItMatters: string().required("This field is required"),
    projectScope: string().required("Project scope is required")
  }),
  object({
    category: string().required("Project category is required"),
    projectImpact: string().required("Project impact is required"),
    estimatedCostUSD: string().required("Estimated Cost is required"),
    images: array()
      .of(
        mixed()
          .test("fileType", "Unsupported file format", (value: any) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
          })
          .test("fileSize", "File too large", (value: any) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return value.size <= 10 * 1024 * 1024;
          })
      )
      .min(1, "At least one image is required")
      .max(5, "You can upload up to 5 images")
  })
]
