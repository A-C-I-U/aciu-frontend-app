import type React from "react"

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

export interface BasePostCard {
    title: string,
    author: string,
    date: string,
    img: string,
}

export interface RegularPostCard extends BasePostCard{
    subtitle: string,
    tags: string[]
}

export interface FeaturedPostCard extends BasePostCard {
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
    title: string,
    creationDate: string,
    postImpressions: number,
    lastModified: string,
    status: "published" | "pending approval" | "rejected" | "draft"
}

