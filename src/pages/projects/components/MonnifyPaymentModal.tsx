import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import type { MonnifyPaymentData } from '@/services/types/projects'


const initializedRefs = new Set<string>()



interface MonnifyPaymentModalProps {
  paymentData: MonnifyPaymentData
  customerName: string
  onSuccess: () => void
  onClose: () => void
}

declare global {
  interface Window {
    MonnifySDK: {
      initialize: (config: {
        amount: number
        currency: string
        reference: string
        customerFullName: string
        customerEmail: string
        apiKey: string
        contractCode: string
        paymentDescription: string
        isTestMode: boolean
        metadata?: Record<string, string>
        onLoadStart?: () => void
        onLoadComplete?: () => void
        onComplete?: (response: { status: string; paymentReference: string; transactionReference: string; amount: number }) => void
        onClose?: (data: unknown) => void
      }) => void
    }
  }
}

export default function MonnifyPaymentModal({
  paymentData,
  customerName,
  onSuccess,
  onClose,
}: MonnifyPaymentModalProps) {
  const ref = paymentData.transactionReference

  useEffect(() => {
    if (initializedRefs.has(ref)) return

    const initializeMonnify = () => {
      if (!window.MonnifySDK) {
        console.error('MonnifySDK not loaded')
        return
      }

      initializedRefs.add(ref)

      window.MonnifySDK.initialize({
        amount: paymentData.amount,
        currency: paymentData.metaData.currency || 'NGN',
        reference: ref,
        customerFullName: customerName,
        customerEmail: paymentData.customerEmail,
        apiKey: import.meta.env.VITE_MONNIFY_API_KEY as string,
        contractCode: import.meta.env.VITE_MONNIFY_CONTRACT_CODE as string,
        paymentDescription: paymentData.metaData.description,
        isTestMode: true,
        metadata: paymentData.metaData,
        onComplete: (response) => {
          console.log('Monnify payment complete:', response)
          if (response.status === 'SUCCESS' || response.status === 'PAID') {
            onSuccess()
          } else {
            initializedRefs.delete(ref)
            onClose()
          }
        },
        onClose: () => {
          initializedRefs.delete(ref)
          onClose()
        },
      })
    }

    if (window.MonnifySDK) {
      initializeMonnify()
      return
    }

    const existingScript = document.getElementById('monnify-sdk-script')
    if (existingScript) {
      existingScript.addEventListener('load', initializeMonnify)
      return
    }

    const script = document.createElement('script')
    script.id = 'monnify-sdk-script'
    script.src = 'https://sdk.monnify.com/plugin/monnify.js'
    script.async = true
    script.onload = initializeMonnify
    script.onerror = () => {
      console.error('Failed to load Monnify SDK script')
      onClose()
    }
    document.head.appendChild(script)
  }, [ref, paymentData, customerName, onSuccess, onClose])

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] gap-4">
      <CircularProgress sx={{ color: '#00B686' }} />
      <p className="text-sm text-gray-500 text-center">
        Opening secure payment window...
        <br />
        <span className="text-xs text-gray-400">Please complete the payment in the Monnify window.</span>
      </p>
    </div>
  )
}
