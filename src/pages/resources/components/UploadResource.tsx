// import FormikField from "@/components/FormikField";
import FormikField from "@/components/FormikField";
import { CloudIcon } from "@/components/Icons";
import type { UploadResourceProps } from "@/utils/types";
import { Box, Drawer, FormLabel, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { array, object, string } from "yup";

const resourceValidationSchema = object({
    name: string().required("File name is required"),
    description: string().required("Description is required"),
    accessLevel: array().of(
        string().required("Access level cannot be empty")
    ),
    doc: string().url("Must be a valid URL")
        .matches(/\.(doc|docx|pdf)$/i, "Only .doc, .docx, or .pdf files allowed")
        .required("Document URL is required")
})

const MotionBox = motion.div;


export default function UploadResource({ 
    type = "upload", 
    open, 
    onClose 
}: UploadResourceProps) {
    // Retrieve Initial content using id here
    const initialValues = {
        name: "",
        description: "",
        accessLevel: [""],
        doc: ""
    }

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values, actions);
        console.log(type);
    }

    return (
         <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <MotionBox
                style={{
                padding: "1.25rem 0",
                display: "flex"  
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <div className="px-5 flex justify-between items-center border-b border-b-aciu-dark-grey">
                        <Typography variant="h3" color="#313131">
                            Upload Material
                        </Typography>
                        <X size={24} color="#3E3E3E" />
                    </div>
                    <div className="px-5 py-6 w-full flex items-center justify-center">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={resourceValidationSchema}
                        >
                            {({ values, setFieldValue }) => {
                                return (
                                    <Form>
                                        <Box
                                            display="flex"
                                            gap={4}
                                            alignItems="center"
                                            justifyContent="center"
                                            >
                                                <FormikField
                                                    name="name"
                                                    label="File Name"
                                                    type="text"
                                                    placeholder="Enter the file name"
                                                    fullWidth
                                                />
                                                <FormikField
                                                    name="description"
                                                    label="File Description"
                                                    type="text"
                                                    placeholder="Describe the file"
                                                    fullWidth
                                                />
                                                <div className="flex flex-col gap-2">
                                                    <FormLabel
                                                        sx={{
                                                            fontWeight: 500,
                                                            fontFamily: '"Montserrat", sans-serif',
                                                            fontSize: ".875rem",
                                                            color: "#3E3E3E"
                                                        }}>
                                                            Display Image&nbsp;
                                                            <span className="text-aciu-green-normal">*</span>
                                                    </FormLabel>
                                                    <div 
                                                        className="cursor-pointer"
                                                        onClick={() => inputRef.current?.click()}>
                                                        {!values.doc ?
                                                            <div className="gap-2 flex flex-col">
                                                                <div className="border border-dashed-aciu-green-normal
                                                                    relative h-[13.375rem] rounded-[5px] min-w-[19.5rem] bg-aciu-cyan-light">
                                                                        <div
                                                                            className="absolute top-1/2 left-1/2 
                                                                                -translate-x-1/2 -translate-y-1/2 
                                                                                text-white font-coolvetica
                                                                                flex flex-col gap-3">
                                                                            <CloudIcon />
                                                                            <p className="text-aciu-abriba font-montserrat font-medium text-sm">
                                                                                Drag & drop or click to choose file
                                                                            </p>
                                                                        </div>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <p className="font-montserrat text-grayscale-400 text-sm">
                                                                        Supported formats: pdf,docx,xml
                                                                    </p>
                                                                    <p className="font-montserrat text-grayscale-400 text-sm">
                                                                        Max: 10mb
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            :
                                                                <div className="flex flex-col gap-[.625rem] items-center">
                                                                    
                                                                    <div className="w-full self-end">
                                                                        <p className="text-aciu-green-normal font-coolvetica text-2xs">
                                                                            Edit Cover Image
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            }
                                                    </div>
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        accept="application/pdf, application/vnd.ms-excel, .pdf, .xls, .xlsx"
                                                        hidden
                                                        onChange={(e) => setFieldValue("doc", e.target.files?.[0] || null)}
                                                    />
                                                </div>
                                                <Box
                                                    boxShadow="0px 4px 50px 0px #0000001A"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    alignSelf="flex-end"
                                                >
                                                    <div className="flex gap-[1.375rem] items-center">
                                                        <button
                                                            style={{
                                                                padding: "1rem",
                                                                gap: ".5rem",
                                                                borderRadius: ".75rem",
                                                                backgroundColor: "#00B686",
                                                                color: "#fff",
                                                                fontFamily: "'Coolvetica', sans-serif",
                                                                width: "100%"
                                                            }}
                                                            >
                                                                Upload Resource
                                                        </button>
                                                        <button
                                                            style={{
                                                                padding: "1rem",
                                                                gap: ".5rem",
                                                                borderColor: "#FF0707",
                                                                borderRadius: ".75rem",
                                                                color: "#FF0707",
                                                                fontFamily: "'Coolvetica', sans-serif",
                                                                width: "100%"
                                                            }}
                                                            >
                                                                Cancel
                                                        </button>
                                                    </div>
                                                </Box>
                                        </Box>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </MotionBox>
            </Drawer>
    )
}