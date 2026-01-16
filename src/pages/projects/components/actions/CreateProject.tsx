import FormikField from "@/components/FormikField"
import { AddImage, UploadFileImage } from "@/components/Icons"
import ShellHeader from "@/components/ShellHeader"
import ShellModal from "@/components/ShellModal"
import { useCreateProject } from "@/services/mutations/projects"
import { createProjectSchemas } from "@/services/types/projects"
import { projectCategoryOptions } from "@/utils/data"
import { CircularProgress, Divider } from "@mui/material"
import { Form, Formik, useFormikContext } from "formik"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import ProjectCreated from "../ProjectCreated"

const initialValues = {
    title: "",
    managedBy: "",
    briefDescription: "",
    whyItMatters: "",
    projectScope: "",
    category: "",
    projectImpact: "",
    estimatedCostUSD: "",
    images: [] as File[],
}

export default function CreateProject({ open, onClose }: {
    open: boolean,
    onClose: () => void
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isAdvancing, setIsAdvancing] = useState(false);
    const [projectCreated, setIsProjectCreated] = useState(false);
    const createProjectMutation = useCreateProject();

    const handleGoBack = () => {
        if (currentStep === 1) {
            onClose();
        } else {
            setCurrentStep((step) => step - 1);
        }
    }

    const handleSubmit = async (values: typeof initialValues, actions: any) => {
        const payload = {
            title: values.title,
            category: values.category,
            briefDescription: values.briefDescription,
            managedBy: values.managedBy,
            whyItMatters: values.whyItMatters,
            projectScope: values.projectScope,
            projectImpact: values.projectImpact,
            estimatedCostUSD: values.estimatedCostUSD,
            images: values.images
        }

        try {
            const result = await createProjectMutation.mutateAsync({ payload });
            enqueueSnackbar(result.message || "Project created successfully", { variant: "success" });
            actions.setSubmitting(false);
            setIsProjectCreated(true);
            onClose();
        } catch (error: any) {
            console.error("Project creation error: ", error);
            enqueueSnackbar(error, { variant: "error" })
        }
    }

    return (
        <>
            <ShellModal open={open} onClose={onClose}>
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader 
                        title="Create Project" 
                        onClose={() => {
                            onClose();
                            setCurrentStep(1);
                        }}
                    />
                    <Divider className="flex shrink-0" />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={createProjectSchemas[currentStep - 1]}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isValid, isSubmitting, validateForm }) => {
                            return (
                                <Form className="flex flex-col h-full overflow-hidden">
                                    <div className="resources-modal-body pb-6">
                                        {currentStep === 1 && <CreateProjectOne />}
                                        {currentStep === 2 && <CreateProjectTwo />}
                                    </div>
                                    <div className="px-5.5 py-4 flex items-center gap-2 shadow-[0px_4px_50px_0px_#0000001A] flex-shrink-0">
                                        {!isAdvancing && (currentStep !== createProjectSchemas.length ? (
                                            <button 
                                                className="btn btn-primary"
                                                disabled={!isValid || isSubmitting}
                                                type={currentStep === 2 ? "submit" : "button"}
                                                onClick={async () => {
                                                    setIsAdvancing(true);
                                                    const errors = await validateForm();
                                                    if (Object.keys(errors).length === 0) {
                                                        setCurrentStep(step => step + 1);
                                                    }
                                                    setIsAdvancing(false);
                                                }}
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                disabled={!isValid || isSubmitting}
                                            >
                                                Create Project
                                                {createProjectMutation.isPending && <CircularProgress sx={{ color: "white" }} size={12} />}
                                            </button>
                                        ))}
                                        <button type="button" className={`btn ${currentStep === 2 ? "btn-secondary border-aciu-abriba text-aciu-abriba" : "btn-danger"} leading-[155%]`} onClick={handleGoBack}>
                                            {currentStep === 2 ? "Back" : "Cancel"}
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </ShellModal>
            <ProjectCreated
                open={projectCreated}
                onClose={() => {
                    setIsProjectCreated(false);
                    onClose();
                }}
            />
        </>
    )
}


export const CreateProjectOne = () => {
    return (
        <div className="flex flex-col gap-6">
            <FormikField
                name="title"
                label="Project Title"
                placeholder="Input the title of the Project"
                fullWidth
            />
            <FormikField
                name="managedBy"
                label="Assign Project"
                placeholder="Type in the name of who will be in charge"
                fullWidth
            />
            <FormikField
                name="briefDescription"
                label="Project Description"
                placeholder="Describe this project"
                rows={5}
                textarea
                fullWidth
            />
             <FormikField
                name="whyItMatters"
                label="Why It Matters"
                placeholder="What is the essence of this project"
                rows={5}
                textarea
                fullWidth
            />
             <FormikField
                name="projectScope"
                label="Project Scope"
                placeholder="Outline the scope of this project"
                rows={5}
                textarea
                fullWidth
            />
        </div>
    )
}


export const CreateProjectTwo = () => {
    const { touched, errors, values, setFieldValue } = useFormikContext<typeof initialValues>();
    const slots = Array.from({ length: 5 }, (_, i) => values.images[i] ?? null);


    return (
        <div className="flex flex-col gap-6">
            <FormikField 
                name="category"
                label="Project Category"
                placeholder="Select Project Category"
                options={projectCategoryOptions}
                select
                fullWidth
            />
            <FormikField
                name="projectImpact"
                label="Project Impact"
                placeholder="How does this project impact the Abriba people?"
                rows={5}
                textarea
                fullWidth
            />
            <FormikField
                name="estimatedCostUSD"
                label="Estimated Cost (USD)"
                placeholder="Provide an approximate budget"
                fullWidth
            />
            <div  className="gap-2 flex flex-col">
                <span className="text-aciu-aciu-border-grey text-sm leading-default font-medium">
                    Upload Project Image
                </span>
                <div className="grid grid-cols-4 gap-1.5 md:gap-4">
                    {slots?.map((file, index) => (
                        <label
                            key={index}
                            className={`relative w-full overflow-hidden rounded-2xs
                                ${index === 0
                                ? "col-span-4 h-fit"
                                : "col-span-1 h-fit"}
                            `}
                            >
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                hidden
                                onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (!file) return;

                                    const newImages = [...(values.images ?? [])];
                                    newImages[index] = file;

                                    setFieldValue("images", newImages);
                                }}
                            />
                            {!file ? (index === 0) ? (
                                <UploadFileImage width="100%" height="100%" />
                            ) : (
                                <AddImage width="100%" height="100%" />
                            ) : (
                                <div className="grid self-stretch h-full">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt=""
                                        className={`w-full ${index === 0 ? "h-60" : "min-h-20 max-h-45"}  object-cover rounded-2xs`}
                                    />
                                </div>
                            )}
                        </label>
                    ))}
                    <div className="flex justify-between items-center col-span-4">
                        <p className="text-grayscale-100 text-xs md:text-sm">
                            Supported formats: pdf, docx, xml
                        </p>
                        <p className="text-grayscale-100 text-xs md:text-sm">
                            Max: 10mb
                        </p>
                    </div>
                    <div className="col-span-4">
                        {touched.images && errors.images && (
                            <p className="text-red-500 text-xs mt-2">
                                {typeof errors.images === "string"
                                ? errors.images
                                : "One or more images are invalid"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}