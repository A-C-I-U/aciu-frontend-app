import { object, ref, string } from "yup";
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
