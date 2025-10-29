import { boolean, mixed, number, object, ref, string } from "yup";
import { AGEGRADES, BRANCHES } from "./data";

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