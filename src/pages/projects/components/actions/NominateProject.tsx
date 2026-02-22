import FormikField from "@/components/FormikField"
import { CloudIcon } from "@/components/Icons"
import { projectCategoryOptions } from "@/utils/data"
import { projectSchema } from "@/utils/schemas"
import { CircularProgress, Divider, FormLabel } from "@mui/material"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import ThankYouPrompt from "./ThankYouPrompt"
import type { DialogFuncProps } from "@/utils/types"
import { enqueueSnackbar } from "notistack"
import { useNominateProject } from "@/services/mutations/projects"
import ShellModal from "@/components/ShellModal"
import ShellHeader from "@/components/ShellHeader"

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

  const handleNext = () => {
    setStep((step) => step + 1);
  }

  const handleThankYouClose = () => {
    setStep(1);
    onClose();
  }

  return (
    <ShellModal open={open} onClose={onClose} forceDialog>
      <>
        {step === 2 ? (
          <ThankYouPrompt
            title="Thank you!"
            description="Your project has been submitted..."
            onClose={handleThankYouClose}
          />
        ) : (
          <div className="resources-modal-section flex flex-col h-full overflow-hidden">
            <ShellHeader title="Send Project Nomination" onClose={onClose} />
            <Divider className="flex shrink-0" />
            <NominateProjectForm
              handleNext={handleNext}
            />
          </div>
        )}
      </>
    </ShellModal>
  )
}


function NominateProjectForm({
  handleNext
}: { handleNext: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nominateProjectMutation = useNominateProject();

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


      const result = await nominateProjectMutation.mutateAsync({ payload });

      enqueueSnackbar(result.message || 'Project nominated successfully', {
        variant: 'success',
      });

      actions.setSubmitting(false);
      handleNext(); // Move to thank you step
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ values, setFieldValue, isSubmitting, errors, touched, handleSubmit }) => (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="resources-modal-body flex-1 overflow-y-auto overflow-y-hidden">
            <Form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-6">
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
                  }}
                >
                  Upload any related image&nbsp;
                  {touched.image && errors.image && (
                    <span className="text-red-500 text-xs">({errors.image})</span>
                  )}
                </FormLabel>
                <label
                  className="cursor-pointer"
                  htmlFor="project-image-upload"
                >
                  {!values.image ? (
                    <div className="gap-2 flex flex-col">
                      <div className={`border-2 border-dashed flex flex-col justify-center
                        relative h-53.5 rounded-[5px] w-full 
                        ${isSubmitting ? 'bg-grayscale-100' : 'bg-aciu-cyan-light'}
                        ${touched.image && errors.image ? 'border-error-normal' : 'border-grayscale-300'}`}
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
                </label>
                <input
                  id="project-image-upload"
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/jpg"
                  style={{ display: 'none' }}
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
            </Form>
          </div>
          <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
            <button
              type="button"
              className="btn btn-primary !text-sm md:!text-base"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Project Nomination'}

              {isSubmitting && (
                <CircularProgress sx={{ color: "white" }} size={12} />
              )}
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}

