import { useQueryClient } from "@tanstack/react-query"
import FormikField from "@/components/FormikField"
import { donationSchema } from "@/utils/schemas"
import { Button, CircularProgress, Dialog, FormControlLabel, Snackbar, Alert } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"
import { useState } from "react"
import ThankYouPrompt from "./ThankYouPrompt"
import type { DialogFuncProps } from "@/utils/types"
import CustomSwitch from "@/components/CustomSwitch"
import { useDashboardOverview } from "@/services/hooks/dashboard"
import { useParams } from "react-router-dom"
import apiClient from "@/services"
import MonnifyPaymentModal from "../MonnifyPaymentModal"

// Stripe imports (commented out — switched to Monnify)
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import PaymentForm from '../PaymentForm'
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string)

interface MonnifyPaymentData {
  transactionReference: string
  paymentReference: string
  amount: number
  customerEmail: string
  metaData: {
    userId: string
    paymentFor: string
    donationTargetType: string
    donationTargetId: string
    amountMajor: string
    currency: string
    anonymous: string
    remarks: string
    description: string
  }
}

interface DonateToProjectApiResponse {
  paymentData: MonnifyPaymentData
}

export default function DonateToProject({
  open,
  onClose
}: DialogFuncProps) {
  const { id: projectId } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [step, setStep] = useState(1)
  const [monnifyPaymentData, setMonnifyPaymentData] = useState<MonnifyPaymentData | null>(null)
  const [donorName, setDonorName] = useState("")
  const [error, setError] = useState<string | null>(null)

  const { data: dashboardData, isLoading: isLoadingProfile } = useDashboardOverview()
  const userProfile = dashboardData?.profile

  const initialValues = {
    email: userProfile?.email || "",
    name: userProfile?.fullName || "",
    amount: "",
    remarks: "",
    anonymous: false
  }

  const handleSubmit = async (values: any, actions: any) => {
    if (!projectId) {
      setError("Project ID is missing")
      return
    }

    try {
      const donationPayload = {
        amountNGN: String(values.amount),
        anonymous: values.anonymous,
        remarks: values.remarks
      }

      const response = await apiClient.post<DonateToProjectApiResponse>(
        `/payments/checkout/project/${projectId}/donate`,
        donationPayload
      )

      setMonnifyPaymentData(response.data.paymentData)
      setDonorName(values.name)
      setStep(2)

    } catch (err: any) {
      console.error("Donation error:", err)
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.[0]?.message ||
        "Failed to process donation. Please try again."
      )
      actions.setSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] })
    queryClient.invalidateQueries({ queryKey: ["projectDetails"] })
    queryClient.invalidateQueries({ queryKey: ["project-donations"] })
    queryClient.invalidateQueries({ queryKey: ["transactions-overview"] })
    queryClient.invalidateQueries({ queryKey: ["project-donations-visuals"] })
    setStep(3)
  }

  const handlePaymentClose = () => {
    setStep(1)
    setMonnifyPaymentData(null)
  }

  const handleCloseError = () => {
    setError(null)
  }

  const handleClose = () => {
    setStep(1)
    setMonnifyPaymentData(null)
    setDonorName("")
    setError(null)
    onClose()
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        onTransitionExited={() => {
          setStep(1)
          setMonnifyPaymentData(null)
          setDonorName("")
          setError(null)
        }}
        disableScrollLock
        sx={{
          "& .MuiDialog-paper": {
            overflow: "hidden",
            width: {
              xs: "92%",
              md: "38.25rem",
            },
            margin: "0 auto",
          },
        }}
      >
        {step === 3 ? (
          <ThankYouPrompt
            title="Thank you!"
            description="Your donation has been made. You'll be contacted if more details are needed."
            onClose={handleClose}
          />
        ) : step === 2 && monnifyPaymentData ? (
          <div className="flex flex-col gap-8 w-full mx-auto rounded-lg h-4/5 overflow-hidden">
            <p className="text-2xl font-coolvetica text-aciu-dark font-bold leading-[125%] pt-4 md:pt-10 px-4 md:px-20">
              Complete Payment
            </p>
            <button
              aria-label="Close payment modal"
              onClick={handleClose}
              className="absolute right-5 top-6 lg:right-20 lg:top-10 cursor-pointer"
            >
              <X width={24} height={24} />
            </button>
            <div className="flex-1 overflow-y-auto pb-4 md:pb-10 px-4 md:px-20">
              {/* Donation summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-sm mb-2">Donation Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    ₦{Number(monnifyPaymentData.metaData.amountMajor).toLocaleString()} NGN
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Name:</span>
                  <span>{monnifyPaymentData.metaData.anonymous === "true" ? "Anonymous" : donorName}</span>
                </div>
                {monnifyPaymentData.metaData.remarks && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Remarks:</span>
                    <p className="mt-1 text-gray-800">{monnifyPaymentData.metaData.remarks}</p>
                  </div>
                )}
              </div>
              <MonnifyPaymentModal
                paymentData={monnifyPaymentData}
                customerName={donorName}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
              />
            </div>
          </div>
        ) : (
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={donationSchema}
            validateOnMount
            enableReinitialize
          >
            {({ values, setFieldValue, isValid, isSubmitting, handleSubmit }) => {
              if (isLoadingProfile) {
                return (
                  <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
                    <CircularProgress />
                    <p className="mt-4 text-aciu-abriba">Loading your profile...</p>
                  </div>
                )
              }

              return (
                <div className="flex flex-col gap-8 w-full mx-auto rounded-lg h-4/5 overflow-hidden">
                  <p className="text-2xl font-coolvetica text-aciu-dark font-bold leading-[125%] pt-4 md:pt-10 px-4 md:px-20">
                    Make a Donation
                  </p>
                  <button
                    aria-label="Close donation modal"
                    onClick={handleClose}
                    className="absolute right-5 top-6 lg:right-20 lg:top-10 cursor-pointer"
                  >
                    <X width={24} height={24} />
                  </button>
                  <div className="flex-1 overflow-y-auto pb-4 md:pb-10 px-4 md:px-20">
                    <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                      <FormikField
                        label="Email Address"
                        name="email"
                        placeholder="princeugbuta@gmail.com"
                        fullWidth
                        disabled={!!userProfile?.email}
                        helperText={userProfile?.email ? "Email from your profile" : undefined}
                      />

                      <FormikField
                        label="Full Name"
                        name="name"
                        placeholder="Obinna Chijioke"
                        fullWidth
                        disabled={!!userProfile?.fullName}
                        helperText={userProfile?.fullName ? "Name from your profile" : undefined}
                      />

                      <div className="flex flex-col gap-1">
                        <FormikField
                          label="Amount (NGN)"
                          name="amount"
                          placeholder="10,000"
                          fullWidth
                          required
                          type="number"
                        />
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={values.anonymous}
                              onChange={(fieldName, value) => setFieldValue(fieldName, value)}
                              fieldName="anonymous"
                            />
                          }
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: ".75rem",
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 500,
                              color: '#737373'
                            }
                          }}
                          label="Donate anonymously"
                        />
                      </div>

                      <FormikField
                        label="Remarks"
                        name="remarks"
                        placeholder="What remarks would you like to give?"
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Form>
                  </div>
                  <div className="pb-4 md:pb-10 px-4 md:px-20 w-full">
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
                        width: "100%"
                      }}
                      disabled={isSubmitting || !isValid}
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                      }}
                    >
                      <span className="font-coolvetica text-base">
                        {isSubmitting ? "Processing..." : "Continue to Payment"}
                      </span>

                      {isSubmitting && (
                        <span className="ml-2">
                          <CircularProgress sx={{ color: "white" }} size={16} />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )
            }}
          </Formik>
        )}
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}