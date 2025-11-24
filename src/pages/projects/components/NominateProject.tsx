import FormikField from "@/components/FormikField"
import { CloudIcon } from "@/components/Icons"
import { projectCategoryOptions } from "@/utils/data"
import { projectSchema } from "@/utils/schemas"
import { Button, CircularProgress, Dialog, FormLabel } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"
import { useRef, useState } from "react"
import ThankYouPrompt from "./ThankYouPrompt"
import type { DialogFuncProps } from "@/utils/types"
import { enqueueSnackbar } from "notistack"
import { useCreateProject } from "@/services/mutations/projects"

interface ProjectFormValues {
  title: string;
  category: string;
  location: string;
  description: string;
  impact: string;
  cost: string;
  image: File | string | null;
}

const initialValues: ProjectFormValues = {
  title: "",
  category: "",
  location: "",
  description: "",
  impact: "",
  cost: "",
  image: null,
}

export default function NominateProject({
  open,
  onClose
}: DialogFuncProps) {
  const [step, setStep] = useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const createProjectMutation = useCreateProject();

  const handleSubmit = async (values: ProjectFormValues, actions: any) => {
    try {
      
      const payload = {
        title: values.title,
        category: values.category,
        location: values.location,
        briefDescription: values.description,
        expectedImpact: values.impact,
        estimatedCostUSD: values.cost.toString(), 
        image: values.image instanceof File ? values.image : null,
      };


      const result = await createProjectMutation.mutateAsync(payload);
      
      enqueueSnackbar(result.message || 'Project nominated successfully', {
        variant: 'success',
      });
      
      actions.setSubmitting(false);
      setStep(2); // Move to thank you step
    } catch (error: any) {
      console.error('Project nomination error:', error);
      
      let errorMessage = 'Failed to nominate project';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (typeof error.response?.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
      
      actions.setSubmitting(false);
    }
  }

  const handleClose = () => {
    onClose();
  }

  const handleThankYouClose = () => {
    setStep(1);
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      onTransitionExited={() => setStep(1)} 
      disableScrollLock
      sx={{
        "& .MuiDialog-paper": {
          overflow: "hidden",
          width: {
            xs: "92%",
            md: step === 1 ? "38.25rem" : "31.25rem",
          },
          margin: "0 auto",
          borderRadius: "1.25rem"
        },
      }}
    >
      {step === 2 ? (
        <ThankYouPrompt 
          title="Thank you!"
          description="Your project has been submitted for review. 
            You'll be contacted if more details are needed."
          onClose={handleThankYouClose} 
        />
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={projectSchema}
          validateOnMount
        >
          {({ values, setFieldValue, isValid, isSubmitting, errors, touched, handleSubmit }) => {
            
            return (
              <div 
                className="flex flex-col gap-8 w-full mx-auto rounded-lg h-4/5 overflow-hidden"
              >
                <p className="text-2xl font-coolvetica text-aciu-dark font-bold leading-[125%] pt-4 md:pt-10 px-4 md:px-20">
                  Send a Project Nomination
                </p>
                <button
                  aria-label="Close donation modal"
                  onClick={handleClose}
                  className="absolute right-5 top-6 lg:right-20 lg:top-10 cursor-pointer"
                  disabled={isSubmitting}
                  type="button"
                >
                  <X width={24} height={24} />
                </button>
                <div className="flex-1 overflow-y-auto pb-4 md:pb-10 px-4 md:px-20">
                  <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <FormikField
                      label="Project Title"
                      name="title"
                      placeholder="Itumbauzo Road Lighting Project"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <FormikField
                      label="Project Category"
                      name="category"
                      options={projectCategoryOptions}
                      placeholder="Health, Education, Infrastructure, Youth, Elder Welfare"
                      select
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <FormikField
                      label="Location"
                      name="location"
                      placeholder="Village/Town/State/Country where this will take place"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <FormikField
                      label="Brief Description"
                      name="description"
                      placeholder="What's the goal of this project and why is it needed?"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <FormikField
                      label="Expected Impact"
                      name="impact"
                      placeholder="Who will benefit? What will this project solve or improve?"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <FormikField
                      label="Expected Cost (USD)"
                      name="cost"
                      placeholder="Provide an approximate budget if known"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <div className="flex flex-col gap-2">
                      <FormLabel
                        sx={{
                          fontWeight: 500,
                          fontFamily: '"Montserrat", sans-serif',
                          fontSize: ".875rem",
                          color: "#3E3E3E"
                        }}>
                        Upload any related image&nbsp;
                        {touched.image && errors.image && (
                          <span className="text-red-500 text-xs">({errors.image})</span>
                        )}
                      </FormLabel>
                      <div 
                        className="cursor-pointer"
                        onClick={() => !isSubmitting && inputRef.current?.click()}
                      >
                        {!values.image ? (
                          <div className="gap-2 flex flex-col">
                            <div className={`border-2 border-dashed flex flex-col justify-center
                              relative h-53.5 rounded-[5px] min-w-78 
                              ${isSubmitting ? 'bg-gray-100' : 'bg-aciu-cyan-light'}
                              ${touched.image && errors.image ? 'border-red-500' : 'border-gray-300'}`}
                            >
                              <div
                                className="items-center justify-center
                                  text-white font-coolvetica
                                  flex flex-col gap-3 w-full"
                              >
                                <CloudIcon />
                                <p className="text-aciu-abriba font-montserrat font-medium text-sm">
                                  Drag & drop or click to choose file
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-montserrat text-grayscale-400 text-sm">
                                Supported formats: png & jpg
                              </p>
                              <p className="font-montserrat text-grayscale-400 text-sm">
                                Max: 10mb
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2.5 items-center">
                            {typeof values.image === "string" ? (
                              <img
                                src={values.image}
                                alt="Project cover"
                                className="rounded-[.625rem] w-full h-53.5 object-cover"
                              />
                            ) : (
                              <img
                                src={URL.createObjectURL(values.image)}
                                alt="Project cover preview"
                                className="rounded-[.625rem] w-full h-53.5 object-cover"
                              />
                            )}
                            {!isSubmitting && (
                              <div className="w-full self-end">
                                <p className="text-aciu-green-normal font-coolvetica text-2xs cursor-pointer">
                                  Edit Cover Image
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg, image/png, image/webp, image/jpg"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (!file.type.startsWith('image/')) {
                              enqueueSnackbar('Please select a valid image file', { variant: 'error' });
                              return;
                            }
                            if (file.size > 10 * 1024 * 1024) {
                              enqueueSnackbar('File size must be less than 10MB', { variant: 'error' });
                              return;
                            }
                            setFieldValue("image", file);
                          }
                        }}
                        disabled={isSubmitting}
                      />
                    </div>       
                  
                    <div className="w-full">
                      <Button
                        sx={{
                          color: "white",
                          fontSize: ".75rem",
                          backgroundColor: !isValid || isSubmitting ? "#ccc" : "#00B686",
                          borderRadius: ".75rem",
                          padding: "1rem",
                          boxShadow: "0px 1px 2px 0px #0D0D120A",
                          textTransform: "none",
                          "&.Mui-disabled": {
                            backgroundColor: "#e0e0e0",
                            color: "#9e9e9e",
                            opacity: 0.6,
                          },
                          width: "100%",
                          "&:hover": {
                            backgroundColor: !isValid || isSubmitting ? "#ccc" : "#009970",
                          }
                        }}
                        className="flex gap-2 items-center"
                        disabled={isSubmitting || !isValid}
                        type="submit"
                      >
                        <span className="font-coolvetica text-base">
                          {isSubmitting ? 'Submitting...' : 'Send Project Nomination'}
                        </span>

                        {isSubmitting && (
                          <span className="mt-1.5">
                            <CircularProgress sx={{ color: "white" }} size={12} />
                          </span>
                        )}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            )
          }}
        </Formik>
      )}
    </Dialog>
  );
}