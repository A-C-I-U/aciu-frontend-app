import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button, CircularProgress, Alert } from '@mui/material'

interface PaymentFormProps {
  onSuccess: () => void
  donationData: {
    email: string
    name: string
    amount: string
    remarks: string
    anonymous: boolean
    paymentIntentId: string
  }
}

export default function PaymentForm({ onSuccess, donationData }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: donationData.email,
          payment_method_data: {
            billing_details: {
              name: donationData.name,
              email: donationData.email,
            }
          }
        },
        redirect: 'if_required'
      })

      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment')
        setIsProcessing(false)
      } else {
        onSuccess()
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setErrorMessage(err.message || 'An unexpected error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Donation Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-sm mb-2">Donation Summary</h3>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Amount:</span>
          <span className="font-semibold">${donationData.amount} USD</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Name:</span>
          <span>{donationData.anonymous ? 'Anonymous' : donationData.name}</span>
        </div>
        {donationData.remarks && (
          <div className="mt-2 text-sm">
            <span className="text-gray-600">Remarks:</span>
            <p className="mt-1 text-gray-800">{donationData.remarks}</p>
          </div>
        )}
      </div>

      <div className="border border-aciu-abriba rounded-lg p-4">
        <PaymentElement />
      </div>

      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        sx={{
          color: "white",
          fontSize: ".75rem",
          backgroundColor: (!stripe || isProcessing) ? "#ccc" : "#00B686",
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
      >
        <span className="font-coolvetica text-base">
          {isProcessing ? "Processing Payment..." : `Pay $${donationData.amount}`}
        </span>
        {isProcessing && (
          <span className="ml-2">
            <CircularProgress sx={{ color: "white" }} size={16} />
          </span>
        )}
      </Button>
    </form>
  )
}