import type React from "react"
import { type JSONContent, Editor } from '@tiptap/react'
import type { Icon } from "iconsax-react";

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
  id: string;
  name: string;
  occupation: string,
  phoneNumber: string,
  email: string,
  ageGrade: boolean,
  branch: boolean,
  role: Role;
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
    id: string,
    title: string,
    img: string,
    host: string,
    date: string,
    time: string,
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
    title: string,
    creationDate: string,
    postImpressions: {
        comments: number,
        views: number
    },
    lastModified: string,
    status: "published" | "pending approval" | "rejected" | "draft"
}

export interface FileViewProps {
    file: File;
    name: string;
    description: string;
};

export interface FileViewDrawerProps extends FileViewProps {
    open: boolean,
    onClose: () => void
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
    name: string,
    position: string,
    occupation: string,
    email: string,
    phoneNumber: string
}

export interface LocateBranchProps {
    open: boolean,
    onClose: () => void,
    onBranchLocation: () => void
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
}
