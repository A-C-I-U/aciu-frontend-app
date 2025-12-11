import type React from "react"
import { type JSONContent, Editor } from '@tiptap/react'
import type { Icon } from "iconsax-react";
import type { BranchSearchResponse } from "@/services/types/helpandsupport";

export interface AuthCardProps {
    header?: string,
    subheader?: React.ReactNode,
    cardFooter?: boolean,
    optionalHeader?: boolean,
    optionalCardHeader?: React.ReactElement,
    children: React.ReactElement;
}

export interface FormikPhoneInputProps {
  name: string;
  label?: string;
  defaultCountry?: string;
}

export interface StepContentProps {
    header: string,
    optionalHeader?: boolean,
    optionalCardHeader?: React.ReactElement,
    subheader: React.ReactNode,
    initialValues: any,
    footer: () => React.ReactElement,
    submit: () => void
}

export interface OptionLabelProps {
    value: string,
    label: string
}

export interface SignUpFormValues {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    verificationCode?: string;
    gender?: string;
    location?: string;
    branch?: string;
    village?: string;
    ageGrade?: string;
    occupation?: string;
}

export interface ForgotPasswordValues {
    email?: string;
    verificationCode?: string;
    password?: string;
    confirmPassword?: string;
}


type Role = "member" | "branch-admin" | "national-admin";

export interface User {
  name: string;
  occupation: string,
  phoneNumber: string,
  email: string,
  ageGrade: string,
  branch: string,
  role: Role;
  verified: boolean
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
};

export interface NavProps {
    open?: boolean,
    handleOpen?: () => void,
    handleClose?: () => void
}
export interface EventItemProps {
    id: string;
    title: string;
    img: string;
    host: string;
    date: string;
    time: string;
    description?: string;
    location?: string;
    category?: string;
    entryFee?: string;
    enableRSVP?: boolean;
    enableDonations?: boolean;
    registeredCount?: number;
}
export interface EventItemProps {
    id: string;
    title: string;
    img: string;
    host: string;
    date: string;
    time: string;
    description?: string;
    location?: string;
}

export interface TabItem {
    key: string,
    label: string,
    content: React.ReactNode
}

export interface PageTitleProps {
    title: string,
    tabs: TabItem[],
    activeTab: TabItem,
    onTabChange: (tab: TabItem) => void
}

export interface BasePostCardType {
    id: string,
    title: string,
    author: string,
    date: string,
    img: string,
}

export interface RegularPostCardType extends BasePostCardType {
    subtitle: string,
    tags: string[]
}

export interface FeaturedPostCardType extends BasePostCardType {
    views: number,
    comments: number
}

export interface DetailCardProps {
    icon: React.ReactNode,
    title: string,
    content: string
}

export interface EventDetailsProps {
    id: string,
    img: string,
    branch: string,
    title: string,
    content: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string,
    eventHighlights: string[],
}

export interface PublicationCardProps { 
    title: string,
    postNumber: string,
    rateOfChange: string
}

export interface PublicationDataType {
    id: string,
    slug?: string,
    title: string,
    creationDate: string,
    postImpressions: {
        comments: number,
        views: number
    },
    lastModified: string,
    status: "published" | "pending approval" | "rejected" | "draft"
}

// export interface FileViewProps {
//     file: File;
//     name: string;
//     description: string;
// };

// export interface FileViewDrawerProps {
//     open: boolean,
//     onClose: () => void
// }

export interface FileViewProps {
    file: {
        url: string;
        size: number;
        format: string;
        name: string;
    };
    name: string;
    description?: string;
    resourceId?: string;
}

export interface FileViewDrawerProps {
    open: boolean;
    onClose: () => void;
    resourceId?: string;
}

export interface UploadResourceProps {
    type: "upload" | "edit",
    open: boolean,
    onClose: () => void
}

export interface BlogPostFormValues {
    title: string,
    description: string,
    tags: string[],
    displayImage: string,
    imageAlt: string,
    content: string,
    postVisibility: "public" | "private",
    status: "published" | "pending approval" | "rejected" | "draft"
}


export type EditorContent = Editor | string | JSONContent | null;

export interface MenuCardProps {
    icon: Icon,
    title: string,
    description: string,
    route: string,
    action?: boolean,
    onClick?: () => void
}


export interface BranchExecCardProps {
    id: string | number,
    name: string,
    position: string,
    occupation: string,
    email: string,
    phoneNumber: string
}

// export interface LocateBranchProps {
//     open: boolean,
//     onClose: () => void,
//     onBranchLocation: () => void
// }

export interface LocateBranchProps {
    open: boolean;
    onClose: () => void;
    onBranchLocation: (data?: BranchSearchResponse) => void;
}

export interface ProjectCardProps {
    id?: string,
    name: string,
    image: string,
    badge: string,
    targetFunds: string,
    collectedFunds: string,
    description: string,
    link: string
}

interface ProjectSectionBlock {
    type: "paragraph" | "list",
    content: string[]
}

export interface ProjectDonation {
    time: string,
    name: string,
    amount: string
}

export interface ProjectOverviewProps {
    description: string,
    value: string,
    scope: ProjectSectionBlock[],
    impact: ProjectSectionBlock[],
}

export interface ProjectDetailsProps extends ProjectOverviewProps {
    id: string,
    title: string,
    description: string,
    value: string,
    badge: string,
    donations: ProjectDonation[],
    location: string,
    targetFunds: string,
    collectedFunds: string,
    projectImages: string[],
    projectManager: string,
    link: string
}



export interface DialogFuncProps {
    open: boolean,
    onClose: () => void
}


export interface ProjectSidebarCardProps {
  collectedFunds: string | number;
  targetFunds: string | number;
  projectManager: string;
  onDonateClick: () => void;
  onShareClick: () => void;
}

export interface DonationProgressBarProps {
  collected: number;
  target: number;
  percentage: number; 
}

export interface CommentType {
    id: string,
    name: string,
    date: string,
    content: string
}

export interface BlogDetails {
  id: string;
  slug: string;
  title: string;
  author: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
  content: JSONContent;
  comments: CommentType[];
}

export interface BlogSubmissionDetails extends BlogDetails {
    description: string,
    tags: string[],
    displayImage: string,
    imageAlt: string,
    postVisibility: "public" | "private",
    status: "published" | "pending approval" | "rejected" | "draft"
}

export interface StatusBadgeProps {
  label: string;
  bgColor: string;
  labelColor: string;
  dotColor: string;
  height?: string | number;
  className?: string;
}

export interface TagInputProps {
    name?: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export interface CustomSnackbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export interface ProfileFormValues {
  name: string;
  email: string;
  branch: string;
  ageGrade: string;
  occupation: string;
  phoneNumber: string;
};

export interface NotificationOption {
  label: string;
  description: string;
  fieldName: string;
  checked: boolean;
  onChange: (field: string, value: boolean, shouldValidate?: boolean) => void;
}

export interface NotificationSectionProps {
  title: string;
  description: string;
  options: NotificationOption[];
}

export interface StatsCardProps {
    title: string;
    number: string;
    itemLabel?: string;
    currency?: string;
    description?: string;
    rateOfChange: string
}

export interface PaymentDataType {
    id: string,
    date: string,
    category: string,
    description: string,
    amountPaid: string,
    status: string,
    file: {
        url: string;
        name: string;
        type: string;
        size: number;
        uploadedAt?: string;
  }
}

export interface UpcomingEventCardProps {
    id: string | number,
    image: string,
    label: string,
    dateStr: string,
    timeRange: string
    location?: string;

}


export interface PaymentReminderCardProps {
    label?: string;
    amount: string;
    targetDate: Date;
    paymentRoute?: string;
    buttonText?: string;
    className?: string;
    countdownVariant?: "inline" | "block";
    timeUntilDue?: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
}

export interface MetricsCardProps {
    title: string,
    price: string,
    timeStamp: string,
    trend: string
}

export interface ExtendedTabItem extends TabItem {
  description?: string;
  contentDescription?: string
}

export interface DueRulesType {
    ageGrades: string[],
    gender: string,
    location: string,
    memberRoles: string,
    currency: string,
    notifications: string[]
}

export interface ActivityLog {
    id: string,
    action: string,
    timestamp: string,
    actor: string,
    details?: string,
    metadata?: Record<string, any>
}

export interface BranchDueDataType {
    id: string,
    creationDate: string,
    createdBy: string,
    startDate: string,
    endDate: string,
    dueType: string,
    intervals: string,
    amountPaid: string,
    status: "inactive" | "active",
    dueRules: DueRulesType,
    activityLogs: ActivityLog[]
}

export interface FieldConfig<T> {
    label: string;
    value: (item: T) => React.ReactNode;
}

export interface StatusConfig {
    label: string;
    labelColor: string;
    dotColor: string;
    bgColor: string;
}

export interface BranchPaymentsDataType {
    id: string,
    memberName: string,
    date: string,
    title: string,
    type: string,
    amountPaid: string,
    status: string
}

export interface WithdrawalDataType {
    id: string,
    submittedBy: string,
    reasons: string,
    type: string,
    title: string,
    date: string,
    amount: string,
    source: string,
    status: "pending" | "approved"
}

export interface BranchMemberDataType {
    id: string,
    fullName: string,
    ageGrade: string,
    joinedOn: string,
    occupation: string
    verificationStatus: string
}

export interface BranchEventDataType {
    id: string,
    eventTitle: string,
    createdBy: string,
    createdOn: string,
    registered: string,
    verificationStatus: string
}