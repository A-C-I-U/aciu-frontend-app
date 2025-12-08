import FormikField from "@/components/FormikField";
import { UploadFileImage } from "@/components/Icons";
import { Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { useRef } from "react";
import { FilePreviewCard } from "./FilePreviewCard";
import { uploadResourceSchema } from "@/utils/schemas";
import { enqueueSnackbar } from "notistack";
import { useUploadResource } from "@/services/mutations/resources";

const initialValues = {
  name: "",
  description: "",
  accessLevel: "",
  doc: "",
};

const accessLevelOptions = [
  { value: "all_members", label: "All Members" },
  { value: "only_admins", label: "Only Admins" },
];

export default function UploadResourceContent({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useUploadResource();

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const uploadData = {
        file: values.doc,
        file_name: values.name,
        file_description: values.description,
        access_level: values.accessLevel,
      };

      await uploadMutation.mutateAsync(uploadData);

      enqueueSnackbar("Resource uploaded successfully!", {
        variant: "success",
      });

      onSuccess();
    } catch (error: any) {
      enqueueSnackbar(`Upload failed: ${error.message}`, {
        variant: "error",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="resources-modal-section overflow-hidden md:h-full h-4/5 flex flex-col">
      <div className="relative flex items-center justify-between">
        <p className="resources-modal-title">Upload Material</p>
        <button onClick={onClose} className="resources-modal-close">
          <X width={24} height={24} color="#3E3E3E" />
        </button>
      </div>
      <Divider orientation="horizontal" flexItem />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={uploadResourceSchema}
        validateOnMount
      >
        {({ values, setFieldValue, isSubmitting, isValid, submitForm }) => {
          const isLoading = isSubmitting || uploadMutation.isPending;

          return (
            <div className="w-full h-full overflow-hidden relative flex flex-col justify-between">
              <Form className="resources-modal-body mb-4 no-scrollbar">
                <FormikField
                  label="File Name"
                  name="name"
                  placeholder="Input the file name"
                  fullWidth
                />
                <FormikField
                  label="File Description"
                  name="description"
                  placeholder="Provide an appropriate description"
                  fullWidth
                />

                <FormikField
                  label="Access Level"
                  name="accessLevel"
                  placeholder="Select access level"
                  select={true}
                  options={accessLevelOptions}
                  fullWidth
                />

                <div className="flex flex-col gap-2">
                  <label className="resources-form-label">
                    Upload document
                  </label>
                  <div
                    className="cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                  >
                    {!values.doc ? (
                      <div className="gap-2 flex flex-col">
                        <UploadFileImage width="100%" height="auto" />
                        <div className="flex justify-between items-center">
                          <p className="font-montserrat text-grayscale-100 text-sm">
                            Supported formats: pdf,docx,xml
                          </p>
                          <p className="font-montserrat text-grayscale-100 text-sm">
                            Max: 10mb
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2.5 items-center">
                        <FilePreviewCard
                          file={values.doc}
                          width="w-65"
                          height="h-full"
                          className="!mt-0"
                        />
                        <div className="w-full self-end">
                          <p className="text-aciu-green-normal font-coolvetica text-sm">
                            Edit file
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf, application/vnd.ms-excel, .pdf, .xls, .xlsx"
                    hidden
                    onChange={(e) =>
                      setFieldValue("doc", e.target.files?.[0] || null)
                    }
                  />
                </div>
              </Form>
              <div className="py-5.5 px-10.5 resource-buttons-container">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submitForm}
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? "Uploading..." : "Upload Resource"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
