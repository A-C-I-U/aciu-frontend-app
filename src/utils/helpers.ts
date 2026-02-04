import { enqueueSnackbar } from "notistack";
import { ageGradeOptions, logs, publicationStatuses } from "./data";
import type { BranchDueDataType, BranchEventDataType, BranchMemberDataType, BranchPaymentsDataType, PaymentDataType, PublicationDataType, WithdrawalDataType } from "./types";
import { format, parseISO } from "date-fns";
import type { DuesPaymentResponse, NationalDuesResponse } from "@/services/types/transactions";
import type { ActivityLog, FormattedActivityLog } from "@/services/types/nationaldues";
import type { ReceiptConfig } from "@/services/types/receipt";
import { City, State } from "country-state-city";

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

export function generateMockBranchDues(count: number): BranchDueDataType[] {
  const statuses: BranchDueDataType["status"][] = ["active", "inactive"];

  return Array.from({ length: count }, (_, i) => {
    const creation = randomDate(new Date(2023, 0, 1), new Date());

    return {
      id: `${i + 1}`,
      creationDate: creation.toISOString(),
      createdBy: `Current User`,
      startDate: creation.toISOString(),
      endDate: "",
      dueRules: {
        ageGrades: ["All Age Grades"],
        currency: "Dollar",
        gender: "All Genders",
        location: "Nigeria",
        memberRoles: "All Members",
        notifications: ["Every 7 days", "3 days before deadline"]
      },
      activityLogs: logs,
      dueType: `Due Type ${i + 1}`,
      intervals: ["quarterly", "monthly", "anually", "one time"][Math.floor(Math.random() * 3)],
      amountPaid: `${Math.floor(Math.random() * 100000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
}

export function generateMockBranchPayments(
  count: number
): BranchPaymentsDataType[] {
  const statuses = ["completed", "failed"] as const;

  return Array.from({ length: count }, (_, i) => {
    const date = randomDate(new Date(2023, 0, 1), new Date());
    const categories = ["Monthly Dues", "Event Fee", "Donation", "Fine", "Registration Fee", "Levy"];

    return {
      id: `${i + 1}`,
      memberName: `Member ${i + 1}`,
      type: "Dues",
      title: categories[Math.floor(Math.random() * categories.length)],
      date: date.toISOString(),
      amountPaid: `${Math.floor(Math.random() * 100000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
}

export function generateMockWithdrawals(
  count: number
): WithdrawalDataType[] {
  const statuses = ["pending", "approved", "rejected"] as const;

  return Array.from({ length: count }, (_, i) => {
    const date = randomDate(new Date(2023, 0, 1), new Date());

    return {
      id: `${i + 1}`,
      submittedBy: `Person ${i + 1}`,
      reasons: `Narration ${i + 1}`,
      title: `Branch Dues`,
      type: `Branch Dues`,
      source: "Branch Dues",
      date: date.toISOString(),
      amount: `${Math.floor(Math.random() * 100000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}

export function generateMockBranchMembers(
  count: number
): BranchMemberDataType[] {
  const statuses = ["pending", "verified"] as const;

  return Array.from({ length: count }, (_, i) => {
    const date = randomDate(new Date(2023, 0, 1), new Date());

    return {
      id: `${i + 1}`,
      fullName: `Person ${i + 1}`,
      ageGrade: ageGradeOptions[Math.floor(Math.random() * ageGradeOptions.length)].label,
      joinedOn: date.toISOString(),
      occupation: ageGradeOptions[Math.floor(Math.random() * ageGradeOptions.length)].label,
      verificationStatus: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}


export function generateMockBranchEvents(count: number): BranchEventDataType[] {
  const statuses = ["ongoing", "completed"] as const;

  return Array.from({ length: count }, (_, i) => {
    const date = randomDate(new Date(2023, 0, 1), new Date());

    return {
      id: `${i + 1}`,
      eventTitle: `Event ${i + 1}`,
      createdBy: date.toDateString(),
      createdOn: date.toDateString(),
      registered: `${Math.floor(Math.random() * 100)}`,
      verificationStatus: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}

export const publicationStatusMap: Record<PublicationDataType["status"], StatusMap> = {
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
export const branchPaymentStatusMap: Record<PaymentDataType["status"], StatusMap> = {
     completed: { 
        label: "Completed", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    failed: {
        label: "Failed",
        labelColor: "#FF2E2E",
        dotColor: "#FF2E2E",
        bgColor: "#FFEAEA"
    }
}

export const branchStatusMap: Record<BranchDueDataType["status"], StatusMap> = {
    active: { 
        label: "Active", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    inactive: {
        label: "Inactive",
        labelColor: "#3E3E3E",
        dotColor: "#3E3E3E",
        bgColor: "#E5E5E5"
    },
}

export interface StatusMap {
  label: string, 
  labelColor: string, 
  dotColor: string, 
  bgColor: string
}


export const nationalDuesMap: Record<NationalDuesResponse["Status"], StatusMap> = {
    active: { 
        label: "Active", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    inactive: {
        label: "Inactive",
        labelColor: "#3E3E3E",
        dotColor: "#3E3E3E",
        bgColor: "#E5E5E5"
    },
}

export const withdrawalStatusMap: Record<WithdrawalDataType["status"], StatusMap> = {
    pending: {
      label: "Pending",
      labelColor: "#FE961F",
      dotColor: "#FE961F",
      bgColor: "#FAF5EF"
    },
    approved: { 
      label: "Approved", 
      labelColor: "#027A48", 
      dotColor: "#12B76A", 
      bgColor: "#ECFDF3" 
    },
    rejected: {
        label: "Rejected",
        labelColor: "#FF2E2E",
        dotColor: "#FF2E2E",
        bgColor: "#FFEAEA"
    },
}


export const branchMemberStatusMap: Record<BranchMemberDataType["verificationStatus"], StatusMap> = {
  pending: {
      label: "Pending",
      labelColor: "#FE961F",
      dotColor: "#FE961F",
      bgColor: "#FAF5EF"
    },
    verified: { 
      label: "Verified", 
      labelColor: "#027A48", 
      dotColor: "#12B76A", 
      bgColor: "#ECFDF3" 
    }
  }

export const branchEventStatusMap: Record<BranchEventDataType["verificationStatus"], StatusMap> = {
  ongoing: {
      label: "Ongoing",
      labelColor: "#FE961F",
      dotColor: "#FE961F",
      bgColor: "#FAF5EF"
    },
    completed: { 
      label: "Completed", 
      labelColor: "#027A48", 
      dotColor: "#12B76A", 
      bgColor: "#ECFDF3" 
    }
}

export const duePaymentStatusMap: Record<DuesPaymentResponse["status"], StatusMap> = {
     completed: { 
      label: "Completed", 
      labelColor: "#027A48", 
      dotColor: "#12B76A", 
      bgColor: "#ECFDF3" 
    },
    failed: {
      label: "Failed",
      labelColor: "#FF2E2E",
      dotColor: "#FF2E2E",
      bgColor: "#FFEAEA"
    },
    unpaid: {
      label: "Unpaid",
      labelColor: "#FE961F",
      dotColor: "#FE961F",
      bgColor: "#FAF5EF"
    },
    cancelled: {
      label: "Cancelled",
      labelColor: "#3E3E3E",
      dotColor: "#3E3E3E",
      bgColor: "#E5E5E5"
    },
    overdue: {
      label: "Overdue",
      labelColor: "#667085",
      dotColor: "#667085",
      bgColor: "#F2F4F7",
    }
}

export const databaseMemberStatusMap: Record<"approved" | "pending", StatusMap> = {
  pending: {
      label: "Pending",
      labelColor: "#FE961F",
      dotColor: "#FE961F",
      bgColor: "#FAF5EF"
    },
  approved: { 
      label: "Approved", 
      labelColor: "#027A48", 
      dotColor: "#12B76A", 
      bgColor: "#ECFDF3" 
    }
  }

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


export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    enqueueSnackbar("Text copied to clipboard", { variant: "success" })
  } catch (err) {
    enqueueSnackbar(`Failed to copy text: ${err}`, { variant: "error" });
  }
}

export const scrollToPosition = (desktop: boolean) => { 
  const el = desktop ? document.getElementById("nav-tabs") : document.getElementById("section-header");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
};


const FIELD_DISPLAY_NAMES: Record<string, string> = {
    amount: 'Amount',
    startDate: 'Start Date',
    endDate: 'End Date',
    ageGrades: 'Age Grades',
    memberRoles: 'Member Roles',
    notifications: 'Notifications',
    currency: 'Currency',
    interval: 'Interval',
    gender: 'Gender',
    location: 'Location',
    title: 'Title',
};

// Parse PostgreSQL array format {value1,value2} to array
function parsePostgresArray(value: string): string[] {
    if (!value || value === '{}') return [];
    
    const cleaned = value.replace(/^\{|\}$/g, '').replace(/"/g, '');
    return cleaned ? cleaned.split(',').map(v => v.trim()) : [];
}

function formatArrayValue(value: string): string {
    const array = parsePostgresArray(value);
    if (array.length === 0) return 'None';
    if (array.length === 1) return array[0];
    return array.join(', ');
}

function normalizeDateString(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toISOString();
    } catch {
        return dateStr;
    }
}


function hasActualChange(field: string, oldValue: string, newValue: string): boolean {
    if (field.toLowerCase().includes('date')) {
        return normalizeDateString(oldValue) !== normalizeDateString(newValue);
    }
    

    if (oldValue.startsWith('{') && newValue.startsWith('{')) {
        const oldArray = parsePostgresArray(oldValue);
        const newArray = parsePostgresArray(newValue);
        
        return JSON.stringify(oldArray.sort()) !== JSON.stringify(newArray.sort());
    }
    
    return oldValue !== newValue;
}

function formatValue(field: string, value: string): string {
    if (field.toLowerCase().includes('date')) {
        return format(value, "dd MMMM yyyy h:mm a");
    }

    if (value.startsWith('{')) {
        return formatArrayValue(value);
    }
    
    if (field === 'amount') {
        return `${Number(value).toLocaleString()}`;
    }
    
    return value;
}

export function formatActivityLogs(logs: ActivityLog[]): FormattedActivityLog[] {
    return logs
      .map(log => {
        const hasChange = hasActualChange(log.field, log.oldValue, log.newValue);
        
        return {
            userName: log.userName,
            field: log.field,
            displayField: FIELD_DISPLAY_NAMES[log.field] || log.field,
            oldValue: log.oldValue,
            newValue: log.newValue,
            formattedOldValue: formatValue(log.field, log.oldValue),
            formattedNewValue: formatValue(log.field, log.newValue),
            createdAt: log.createdAt,
            formattedDate: format(parseISO(log.createdAt), 'dd MMM yyyy h:mm a'),
            hasActualChange: hasChange,
        };
      })
    .filter(log => log.hasActualChange);
}

export function getStatusConfig(status: string) {
  const key = status?.toLowerCase() || '';
  return RECEIPT_STATUS_MAP[key as keyof typeof RECEIPT_STATUS_MAP] || {
    label: status,
    labelColor: "#667085",
    dotColor: "#667085",
    bgColor: "#F2F4F7"
  };
}

export const formatters = {
  currency: (value: number) => `₦${Math.round(value).toLocaleString()} `,
  date: (value: string | Date) => format(new Date(value), 'dd-MM-yyyy h:mm a'),
  nullableText: (value: string | null | undefined) => value || 'N/A',
  status: (value: string) => getStatusConfig(value),
};


export const RECEIPT_STATUS_MAP = {
    // Success (green)
    'completed': { label: "Completed", labelColor: "#027A48", dotColor: "#12B76A", bgColor: "#ECFDF3" },
    'published': { label: "Published", labelColor: "#027A48", dotColor: "#12B76A", bgColor: "#ECFDF3" },
    'approved': { label: "Approved", labelColor: "#027A48", dotColor: "#12B76A", bgColor: "#ECFDF3" },
    'verified': { label: "Verified", labelColor: "#027A48", dotColor: "#12B76A", bgColor: "#ECFDF3" },
    'active': { label: "Active", labelColor: "#027A48", dotColor: "#12B76A", bgColor: "#ECFDF3" },

    // Warning (orange)
    'pending': { label: "Pending", labelColor: "#FE961F", dotColor: "#FE961F", bgColor: "#FAF5EF" },
    'pending approval': { label: "Pending Approval", labelColor: "#FE961F", dotColor: "#FE961F", bgColor: "#FAF5EF" },
    'overdue': { label: "Overdue", labelColor: "#B54708", dotColor: "#F79009", bgColor: "#FFFAEB" },

    // Error (red)
    'failed': { label: "Failed", labelColor: "#FF2E2E", dotColor: "#FF2E2E", bgColor: "#FFEAEA" },
    'rejected': { label: "Rejected", labelColor: "#FF2E2E", dotColor: "#FF2E2E", bgColor: "#FFEAEA" },

    // Neutral (gray)
    'cancelled': { label: "Cancelled", labelColor: "#667085", dotColor: "#667085", bgColor: "#F2F4F7" },
    'draft': { label: "Draft", labelColor: "#3E3E3E", dotColor: "#3E3E3E", bgColor: "#E5E5E5" },
    'inactive': { label: "Inactive", labelColor: "#3E3E3E", dotColor: "#3E3E3E", bgColor: "#E5E5E5" },
    'unpaid': { label: "Unpaid", labelColor: "#6941C6", dotColor: "#9E77ED", bgColor: "#F9F5FF" },
} as const;

export const eventDonationReceiptConfig: ReceiptConfig = {
    title: 'PAYMENT RECEIPT',
    fields: [
        { label: 'Transaction ID', key: 'transactionId' },
        { label: 'Event Name', key: 'eventName', format: formatters.nullableText },
        { label: 'Event Category', key: 'eventCategory', format: formatters.nullableText },
        { label: 'Donor Name', key: 'donorName' },
        { label: "Donor's Branch", key: 'donorBranch' },
        { label: 'Amount', key: 'amount', format: formatters.currency },
        { label: 'Source', key: 'source' },
        { label: 'Date Paid', key: 'date', format: formatters.date },
        { label: 'Payment Status', key: 'status', format: formatters.status },
    ],
};

export const duesReceiptConfig: ReceiptConfig = {
    title: 'DUES PAYMENT RECEIPT',
    fields: [
      { label: 'Transaction ID', key: 'transactionId' },
      { label: 'Paid By', key: 'paidBy' },
      { label: 'Payer Branch', key: 'payerBranch' },
      { label: 'Dues Title', key: 'duesTitle' },
      { label: 'Source', key: 'source' },
      { label: 'Amount', key: 'amount', format: formatters.currency },
      { label: 'Date Paid', key: 'date', format: formatters.date },
      { label: 'Status', key: 'status', format: formatters.status },
    ],
};


export const projectDonationReceiptConfig: ReceiptConfig = {
    title: 'DONATION RECEIPT',
    fields: [
        { label: 'Transaction ID', key: 'transactionId' },
        { label: 'Donor Name', key: 'donorName' },
        { label: 'Donor Branch', key: 'donorBranch', hideIfEmpty: true },
        { label: 'Project Name', key: 'projectName'},
        { label: 'Amount', key: 'amount', format: formatters.currency },
        { label: 'Source', key: 'source' },
        { label: 'Date', key: 'date', format: formatters.date },
        { label: 'Status', key: 'status', format: formatters.status },
    ],
};

export const withdrawalReceiptConfig: ReceiptConfig = {
  title: "WITHDRAWAL REQUEST RECEIPT",
  fields: [
    { label: 'Transaction ID', key: 'transactionId' },
    { label: 'Payment Type', key: 'paymentType' },
    { label: 'Amount', key: 'amount', format: formatters.currency },
    { label: 'Branch Name', key: 'branchName' },
    { label: 'Submitted By', key: 'submittedBy' },
    { label: 'Date', key: 'date', format: formatters.date },
    { label: 'Status', key: 'status', format: formatters.status },
  ]
}

export const getAllCitiesOfCountry = (countryCode: string) => {
  const states = State.getStatesOfCountry(countryCode);

  let cities: { value: string; label: string }[] = [];

  states.forEach((state) => {
    const stateCities = City.getCitiesOfState(countryCode, state.isoCode);
    cities.push(
      ...stateCities.map((city) => ({
        value: city.name,
        label: city.name,
      }))
    );
  });

  return cities;
};
