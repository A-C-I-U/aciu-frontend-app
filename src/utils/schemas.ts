import { array, boolean, date, mixed, number, object, ref, string } from "yup";
import { AGEGRADES, BRANCHES } from "./data";
import * as yup from 'yup';


// utils/schemas.ts - Update the first schema
export const signupValidationSchemas = [
    object({
        fullName: string().required('Full name is required'),
        email: string().email("Invalid email address").required("Email is required"),
        phoneNumber: string()
            .matches(/^\+\d{10,15}$/, 'Must be a valid phone number with country code')
            .required('Phone number is required'),
        password: string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: string()
            .oneOf([ref('password')], 'Passwords must match') // Add this line
            .required("Confirm password is required") // Add this line
    }),
    object({
        verificationCode: string()
            .matches(/^\d{6}$/, 'Code must be 6 digits')
            .required('Verification code is required'),
    }),
    object({
        gender: string()
            .oneOf(["man", "woman"], "Select one gender")
            .required("Gender is required"),
        
        location: string()
            .oneOf(["nigeria", "abroad"], "Select one location")
            .required("Branch Location is required"),
        branch: string()
            .oneOf(BRANCHES, "Select one branch")
            .required("Branch is required"),
        village: string()
            .oneOf(["ameke", "amogudu", "agboji"], "Select one village")
            .required("Village is required"),
        ageGrade: string()
            .oneOf(AGEGRADES, "Select one age grade")
            .required("Age grade is required"),
       occupation: string()
            .required("Occupation is required"),
    })
]

export const forgotPasswordSchemas = [
    object({
        email: string().email("Invalid email address").required("Email is required"),
    }),
    object({
        verificationCode: string()
            .matches(/^\d{6}$/, 'Code must be 6 digits')
            .required('Verification code is required'),
    }),
    object({
        password: string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: string()
            .oneOf([ref('password')], 'Passwords must match')
            .required("Confirm your password")
    })
]

export const contactUsSchema = object({
    fullName: string().required('Full name is required'),
    email: string().email("Invalid email address").required("Email is required"),
    phoneNumber: string()
        .matches(/^\+\d{10,15}$/, 'Must be a valid phone number with country code')
        .required('Phone number is required'),
    messageBox: string().required('Kindly write extensively what your query is here')
});


export const locateBranchSchema = object({
    location: string().required('Location is required'),
    branch: string().required("Branch name is required")
})

export const projectSchema = object({
    title: string().trim().required("Title is required").min(3).max(100),
    category: string().required("Select a category"),
    location: string().required("Location is required"),
    description: string().required("Description is required").min(20, "Description must be at least 20 characters"),
    impact: string().required("Impact is required").min(10, "Impact must be at least 10 characters"),
    cost: number().typeError("Must be a number").positive().required("Cost is required"),
     image: mixed()
        .required("Image is required")
        .test(
            "fileType",
            "Only PNG, JPG, and WEBP images are allowed",
        (value: any) => {
            if (!value) return false;
            if (typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(value?.type);
        }
        )
        .test(
        "fileSize",
        "File must be less than 10 MB",
        (value: any) => {
            if (!value || typeof value === "string") return true;
            return value?.size <= 10 * 1024 * 1024;
        }
    ),
});

export const donationSchema = object({
    email: string()
        .email("Please enter a valid email address")
        .required("Email is required"),

    name: string()
        .required("Full name is required")
        .min(2, "Name must be at least 2 characters long"),

    amount: number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than zero")
        .required("Donation amount is required"),

    remarks: string()
        .max(200, "Remarks cannot exceed 200 characters"),
        
    anonymousDonate: boolean()
});


export const profileValidationSchema = object({
    name: string()
        .required("Name is required")
        .min(2, "Name must be at least two characters"),
    email: string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    branch: string()
        .oneOf(BRANCHES, "Please select a branch")
        .required("Branch is required"),
    ageGrade: string()
        .oneOf(AGEGRADES, "Select one age grade")
        .required("Age grade is required"),
    occupation: string()
        .required("Occupation is required"),
    phoneNumber: string()
        .matches(/^\+\d{10,15}$/, 'Must be a valid phone number with country code')
        .required('Phone number is required'),
})


export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Old password is required')
    .min(6, 'Old password must be at least 6 characters'),
  
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters')
    .notOneOf([yup.ref('oldPassword')], 'New password must be different from old password'),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export const editResourceSchema = object({
    fileName: string()
        .required("File name is required"),

    fileDescription: string()
        .required("File description is required")
        .min(10, "File description must be at least 10 characters"),
})

export const uploadResourceSchema = object({
    name: string()
        .required("File name is required"),

    description: string()
        .required("File description is required")
        .min(10, "File description must be at least 10 characters"),

    doc: mixed()
        .required("A file is required")
        .test("is-file", "Invalid file", value => value instanceof File),

    accessLevel: string() 
        .required("Access level is required")
        .oneOf(['all_members', 'only_admins'], 'Please select a valid access level'),
});

export const withdrawalRequestSchema = object({
    source: string()
        .required("Withdrawal source is required"),
    amount: string()
        .required("Amount is required"),
    submittedBy: string()
        .required("This field is required"),
    submittedOn: string()
        .required("This field is required"),
    bankName: string()
        .required("Bank name is required"),
    accountNumber: string()
        .required("Account number is required"),
    reason: string()
        .required("Reason is required"),
    customReason: string()
        .optional(), 
    document: mixed()
        .required("A file is required")
        .test("is-file", "Invalid file", value => value instanceof File),

})

export const adminSchema = object({
    memberName: string()
        .required("Member's name is required"),
    createdBy: string()
        .required("This field is required"),
    createdOn: string()
        .required("Creation date is required"),
    startDate: date()
        .required("Start date is required"),
    endDate: date()
        .nullable()
        .min(ref("startDate"), "End date cannot be before start date"),
    permissions: object({
        // Member Access
        viewProfiles: boolean().default(false),
        approveMembers: boolean().default(false),
        deleteMemberInfo: boolean().default(false),

        // Dues & Payments
        createEditDues: boolean().default(false),
        viewPayments: boolean().default(false),
        sendReminders: boolean().default(false),

        // Events & Communications
        createEvents: boolean().default(false),
        approvePublications: boolean().default(false),
    })
    .test(
        "at-least-one",
        "At least one permission must be selected",
        (obj) => Object.values(obj).some(Boolean)
    ),
})


export const duesValidationSchema = object({
    duesTitle: string()
        .required("Dues title is required"),
    createdBy: string()
        .required("Created by is required"),
    createdOn: string()
        .required("Created on date is required"),
    interval: string()
        .required("Interval is required"),
    amount: number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),
    startDate: date()
        .required("Start date is required"),
    endDate: date()
        .min(
        ref("startDate"),
        "End date must be after start date"
        )
        .required("End date is required"),
    ageGrades: array()
        .of(string().required("Age grade is required"))
        .min(1, "At least one age grade is required"),

    gender: string()
        .required("Gender is required"),

    location: string()
        .required("Location is required"),

    memberRoles: string()
        .required("Member role is required"),

    notifications: array()
        .of(string().required("Notification is required"))
        .min(1, "At least one notification is required"),
});
