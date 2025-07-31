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