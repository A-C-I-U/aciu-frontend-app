import { publicationStatuses } from "./data";
import type { PaymentDataType, PublicationDataType } from "./types";
import { format } from "date-fns";

export const capitalizeFirstLetters = (str: string) => {
    return str
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const formatDate = (iso: string) => format(new Date(iso), "dd MMM yyyy");

export function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateMockPublications(count: number): PublicationDataType[] {
  return Array.from({ length: count }, (_, i) => {
    const creation = randomDate(new Date(2022, 0, 1), new Date(2023, 0, 1));
    const modified = randomDate(new Date(2023, 0, 2), new Date());

    return {
      id: `${i + 1}`,
      title: `Publication ${i + 1}`,
      creationDate: creation.toISOString(),
      postImpressions: {
        comments: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 300)
      },
      lastModified: modified.toISOString(),
      status: publicationStatuses[Math.floor(Math.random() * publicationStatuses.length)],
    };
  });
}

export const publicationStatusMap: Record<PublicationDataType["status"], { 
    label: string, 
    labelColor: string, 
    dotColor: string, 
    bgColor: string }> = {
    published: { 
        label: "Published", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    "pending approval": {
        label: "Pending Approval",
        labelColor: "#FE961F",
        dotColor: "#FE961F",
        bgColor: "#FAF5EF"
    },
    rejected: {
        label: "Rejected",
        labelColor: "#FF2E2E",
        dotColor: "#FF2E2E",
        bgColor: "#FFEAEA"
    },
    draft: {
        label: "Draft",
        labelColor: "#3E3E3E",
        dotColor: "#3E3E3E",
        bgColor: "#E5E5E5"
    },
}

export const PaymentStatus = {
  COMPLETED: "completed",
  OVERDUE: "overdue",
  FAILED: "failed",
  CANCELED: "cancelled", 
  UNPAID: "unpaid",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// utils/helpers.ts
export const paymentStatusMap = {
  completed: { 
    label: "Completed", 
    labelColor: "#027A48", 
    dotColor: "#12B76A", 
    bgColor: "#ECFDF3",
    action: "download" as const
  },
  failed: {
    label: "Failed",
    labelColor: "#FF2E2E",
    dotColor: "#FF2E2E",
    bgColor: "#FFEAEA",
    action: "retry" as const
  },
  overdue: {
    label: "Overdue",
    labelColor: "#B54708",
    dotColor: "#F79009",
    bgColor: "#FFFAEB",
    action: "pay" as const
  },
  unpaid: {
    label: "Unpaid",
    labelColor: "#6941C6",
    dotColor: "#9E77ED",
    bgColor: "#F9F5FF",
    action: "pay" as const
  },
  cancelled: {
    label: "Cancelled",
    labelColor: "#667085",
    dotColor: "#667085",
    bgColor: "#F2F4F7",
    action: "retry" as const
  },
  pending: {
    label: "Pending",
    labelColor: "#B54708",
    dotColor: "#F79009",
    bgColor: "#FFFAEB",
    action: null
  }
} as const

export type PaymentAction = "download" | "pay" | "retry" | null;

export interface PaymentStatusConfig {
  label: string;
  labelColor: string;
  dotColor: string;
  bgColor: string;
  action: PaymentAction;
}
export const getPaymentStatusConfig = (status: string): PaymentStatusConfig => {
  const normalizedStatus = status.toLowerCase();
  return paymentStatusMap[normalizedStatus as keyof typeof paymentStatusMap] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    labelColor: "#667085",
    dotColor: "#667085",
    bgColor: "#F2F4F7",
    action: null
  };
};

export const getPaymentAction = (status: string): PaymentAction => {
  return getPaymentStatusConfig(status).action;
};


export const getExtension = (file: File | string): string => {
  if (typeof file === 'string') {
    const filename = file.split('/').pop() || ''; 
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  }
  
  // Handle File object (original logic)
  return file.name.split('.').pop()?.toUpperCase() || 'FILE';
};

export const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}

  export const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount);
    };

export function calculateReadingTime(text: string, wordsPerMinute = 225) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
};

const getRandomFileSize = (min: number = 50000, max: number = 5000000): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateMockPayment = (count: number): PaymentDataType[] => {
  return Array.from({ length: count }, (_, i) => {
    const categories = ["Monthly Dues", "Event Fee", "Donation", "Fine", "Registration Fee", "Levy"];
    const statuses = ["completed", "failed"];
    const amounts = ["15000", "25000", "10000", "50000", "2000", "30000"];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const randomDate = getRandomDate(new Date(2024, 0, 1), new Date());
    
    return {
        id: `PAY-${i + 1}`,
        date: randomDate,
        category: randomCategory,
        description: `Payment for ${randomCategory.toLowerCase()}`,
        amountPaid: randomAmount,
        status: randomStatus,
        file: {
            url: `https://example.com/receipts/receipt-${Date.now()}.pdf`,
            name: `payment-receipt-${Date.now()}.pdf`,
            type: "application/pdf",
            size: getRandomFileSize(),
            uploadedAt: randomDate
      },
    };
})}


export const getExtensionFromUrl = (url: string): string => {
  const match = url.match(/\.([^./?]+)(?:[?#]|$)/);
  return match ? match[1] : '';
};