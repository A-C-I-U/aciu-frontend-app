import FormikField from "@/components/FormikField";
import { CloudIcon, MarkIcon } from "@/components/Icons";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { SuccessDialog } from "@/components/SuccessDialog";
import { useUser } from "@/context/UserContext";
import { useSaveBranch } from "@/services/mutations/database";
import type { CreateBranchPayload } from "@/services/types/database";
import { datePickerSx, formLabelSx } from "@/utils/data";
import { createBranchSchema } from "@/utils/schemas";
import type { DialogFuncProps } from "@/utils/types";
import { CircularProgress, Divider, FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country } from "country-state-city";
import { getAllCitiesOfCountry } from "@/utils/helpers";

const initialValues = {
  name: "",
  branchType: "",
  branchCity: "",
  branchCountry: "",
  meetingLocation: "",
  startDate: "",
  branchLogo: "",
};

export default function BranchForm({
  id,
  mode,
  open,
  onClose,
}: DialogFuncProps & {
  id?: string;
  mode: "create" | "edit";
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMode, setSuccessMode] = useState<"create" | "edit">("create");
  const [newBranchId, setNewBranchId] = useState<string>();
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const saveBranchMutation = useSaveBranch();

  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (values: CreateBranchPayload, actions: any) => {
    const countryObj = countries.find(
      c => c.value === values.branchCountry
    );
    const payload = {
      name: values.name,
      branchCity: values.branchCity,
      branchCountry: countryObj?.label ?? "",
      branchType: values.branchType,
      meetingLocation: values.meetingLocation,
      startDate: values.startDate,
      branchLogo: values?.branchLogo,
    };

    setSuccessMode(mode);
    try {
      const result =
        mode === "create"
          ? await saveBranchMutation.mutateAsync({ payload })
          : await saveBranchMutation.mutateAsync({ id, payload });
      setNewBranchId(result.newBranch.id);
      enqueueSnackbar(result.message, { variant: "success" });
      actions.setSubmitting(false);
      onClose();
      setShowSuccess(true);
    } catch (error: any) {
      if (mode === "create") {
        console.error("Create Branch error:", error);
      } else {
        console.error("Update Branch error:", error);
      }
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const countries = useMemo(
    () =>
      Country.getAllCountries().map(c => ({
        value: c.isoCode,
        label: c.name,
      })),
    []
  );

  const cities = useMemo(() => {
    if (!country) return [];
    return getAllCitiesOfCountry(country);
  }, [country]);




  return (
    <>
      <ShellModal open={open} onClose={onClose}>
        <div className="resources-modal-section flex flex-col h-full overflow-hidden">
          <ShellHeader
            title={`${mode === "create" ? "Add New Branch" : "Edit Branch"}`}
            onClose={onClose}
          />
          <Divider className="flex shrink-0" />
          <Formik
            initialValues={initialValues}
            validationSchema={createBranchSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            enableReinitialize
          >
            {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
              return (
                <Form className="flex flex-col h-full overflow-hidden">
                  <div className="flex flex-col gap-4 resources-modal-body pb-8">
                    <FormikField
                      label="Branch Name"
                      name="name"
                      placeholder="Type in the branch name"
                      fullWidth
                    />

                    <FormikField
                      label="Branch Type"
                      name="branchType"
                      placeholder="Select the branch type"
                      options={[
                        { value: "Nigeria", label: "Nigeria" },
                        { value: "Abroad", label: "Abroad" },
                      ]}
                      fullWidth
                      select
                    />
                    <div className="flex gap-4 items-start">
                      
                      <FormikField
                        label="Branch Country"
                        name="branchCountry"
                        placeholder="Select branch country"
                        options={countries}
                        value={values.branchCountry ?? ""}
                        onChange={(e: any) => {
                          const selectedValue = e?.target?.value ?? e;
                          setCountry(selectedValue);
                          setFieldValue("branchCountry", e?.target?.value);
                        }}
                        fullWidth
                        select
                      />
                      <FormikField
                        label="Branch City"
                        name="branchCity"
                        placeholder="Select branch city"
                        value={cities.some(c => c.value === values.branchCity) ? values.branchCity : ""}
                        options={cities}
                        fullWidth
                        select
                        disabled={!country}
                        onChange={(e: any) => {
                          const selectedValue = e?.target?.value ?? e;
                          setFieldValue("branchCity", selectedValue);
                        }}
                      />
                    </div>
                    <FormikField
                      label="Meeting Location"
                      name="meetingLocation"
                      placeholder="Type in the branch's meeting location"
                      fullWidth
                    />
                    <div className="flex flex-col gap-2 items-start w-full">
                      <FormLabel sx={formLabelSx}>Start Date</FormLabel>
                      <DatePicker
                        name="startDate"
                        value={values.startDate ? dayjs(values.startDate) : null}
                        onChange={(newValue) => setFieldValue("startDate", newValue)}
                        className="w-full h-unset py-2"
                        sx={datePickerSx}
                      />
                    </div>
                    <div className="gap-2 flex flex-col">
                      <FormLabel sx={formLabelSx}>Branch Logo(if any)</FormLabel>
                      <label
                        className="w-full rounded-2xs overflow-hidden cursor-pointer flex items-center justify-center"
                        onClick={() => inputRef.current?.click()}
                      >
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          hidden
                          ref={inputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setImage(file);
                              setFieldValue("branchLogo", file)
                            }
                          }}
                        />

                        {!image ? (
                          <div className="gap-2 flex flex-col w-full">
                            <div className={`border-2 border-dashed flex flex-col justify-center
                              relative h-32 rounded-[5px] w-full 
                              ${isSubmitting ? 'bg-gray-100' : 'bg-aciu-cyan-light'}
                              ${touched.branchLogo && errors.branchLogo ? 'border-red-500' : 'border-gray-300'}`}
                            >
                              <div
                                className="items-center justify-center
                                  text-white font-coolvetica
                                  flex flex-col md:flex-row gap-3 w-full"
                              >
                                <CloudIcon width={48} height={48} color="#00B686" />
                                <p className="text-aciu-abriba font-montserrat font-medium text-sm">
                                  Drag & drop or click to choose file
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="w-full h-full object-cover rounded-2xs"
                          />
                        )}
                      </label>
                      <div className="flex justify-between items-center col-span-4">
                        <p className="text-grayscale-100 text-xs md:text-sm">
                            Supported formats: png, jpg, jpeg
                        </p>
                        <p className="text-grayscale-100 text-xs md:text-sm">
                            Max: 10mb
                        </p>
                    </div>
                    </div>
                  </div>
                  <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 shrink-0">
                    <button disabled={!isValid || isSubmitting} className="btn btn-primary">
                      {saveBranchMutation.isPending ? (
                        <>
                          <CircularProgress sx={{ color: "white" }} size={12} />
                          {mode === "create" ? "Creating..." : "Updating..."}
                        </>
                      ) : mode === "create" ? (
                        "Create Branch"
                      ) : (
                        "Update Branch"
                      )}
                    </button>
                    <button className="btn btn-danger" type="button" onClick={onClose}>
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ShellModal>
      <SuccessDialog
        key={successMode}
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<MarkIcon />}
        title={successMode === "create" ? `New Branch Created` : "Branch Updated Successfully"}
        message={`You have successfully ${successMode === "create" ? "created a new branch on the platform." : `updated this branch.`}`}
        primaryAction={{
          label: user?.role === "national_admin" ? "Assign President" : "Add Admin",
          onClick: () => {
            setShowSuccess(false);
            if (user?.role === "national_admin") {
              navigate(`/database/branch/${newBranchId}?tab=branch-leadership`);
            } else if (user?.role === "branch_admin") {
              navigate("/my-branch?tab=branch-leadership");
            }
          },
        }}
        secondaryAction={{
          label: "Go back to branches",
          onClick: () => {
            setShowSuccess(false);
            if (user?.role === "national_admin") {
              navigate("/database?tab=branches");
            } else if (user?.role === "branch_admin") {
              navigate("/my-branch");
            }
          },
        }}
      />
    </>
  );
}
