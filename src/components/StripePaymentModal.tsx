import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { enqueueSnackbar } from "notistack";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentIntent: {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
  } | null;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  userEmail?: string;
  userName?: string;
}

// Your brand colors
const BRAND_COLORS = {
  green: "#00B686",        
  greenDark: "#008F6B",    
  greenLight: "#E6F7F2",   
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

// Payment Form Component using Stripe's PaymentElement
const StripePaymentForm: React.FC<{
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  amount: number;
  currency: string;
}> = ({  onSuccess, onError, onClose, userEmail, userName, amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Return URL for redirect-based payment methods
          return_url: `${window.location.origin}/payment-success`,
          // Pre-fill customer details
          receipt_email: userEmail,
          payment_method_data: {
            billing_details: {
              name: userName,
              email: userEmail,
            },
          },
        },
        redirect: 'if_required', // Only redirect if the payment method requires it
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment');
        onError(error.message || 'An error occurred during payment');
        enqueueSnackbar(error.message || 'Payment failed', {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        onSuccess();
        enqueueSnackbar("Payment successful!", {
          variant: "success",
        });
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      const errorMsg = err.message || 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      onError(errorMsg);
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Payment Summary */}
        <Paper
          sx={{
            p: 3,
            bgcolor: BRAND_COLORS.greenLight,
            borderColor: BRAND_COLORS.green,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
            Payment Summary
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography color="text.secondary">Amount:</Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: BRAND_COLORS.green }}>
              {amount.toLocaleString()} {currency.toUpperCase()}
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography color="text.secondary">Description:</Typography>
            <Typography fontWeight={500}>Monthly Membership Dues</Typography>
          </Box>
          
          {userName && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography color="text.secondary">Name:</Typography>
              <Typography fontWeight={500}>{userName}</Typography>
            </Box>
          )}
        </Paper>

        {/* Stripe Payment Element - Stripe handles all UI */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
            Payment Details
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderColor: "divider",
              borderRadius: 1.5,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <PaymentElement 
                options={{
                  layout: {
                    type: 'tabs', 
                    defaultCollapsed: false,
                    radios: false,
                    spacedAccordionItems: true,
                  },
                  fields: {
                    billingDetails: {
                      name: 'auto',
                      email: 'auto',
                      phone: 'auto',
                      address: {
                        country: 'auto',
                        postalCode: 'auto',
                      },
                    },
                  },
                  terms: {
                    card: 'always',
                    bancontact: 'always',
                    ideal: 'always',
                    sepaDebit: 'always',
                    sofort: 'always',
                    auBecsDebit: 'always',
                    usBankAccount: 'always',
                  },
                  wallets: {
                    applePay: 'auto',
                    googlePay: 'auto',
                  },
                }}
              />
            </Box>
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: "block" }}>
            Stripe handles all payment details securely. We never store your payment information.
          </Typography>
        </Box>

        {errorMessage && (
          <Alert 
            severity="error" 
            icon={<ErrorIcon />}
            onClose={() => setErrorMessage(null)}
            sx={{ mt: 1 }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isProcessing}
            fullWidth
            sx={{
              borderColor: "divider",
              "&:hover": {
                borderColor: BRAND_COLORS.green,
                bgcolor: "action.hover",
              },
              py: 0.5,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!stripe || isProcessing}
            fullWidth
            sx={{
              bgcolor: BRAND_COLORS.green,
              "&:hover": { 
                bgcolor: BRAND_COLORS.greenDark,
              },
              "&.Mui-disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled",
              },
              fontWeight: 600,
              fontSize: "0.9375rem",
              py: 0.5,
            }}
            startIcon={!isProcessing && <CreditCardIcon />}
          >
            {isProcessing ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                Processing...
              </>
            ) : (
              `Pay ${amount.toLocaleString()} ${currency.toUpperCase()}`
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export const StripePaymentModal: React.FC<StripePaymentModalProps> = ({
  isOpen,
  onClose,
  paymentIntent,
  isLoading,
  error,
  onRetry,
  userEmail,
  userName,
}) => {
  const handleSuccess = () => {
    setTimeout(() => {
      onClose();
      // You can refresh data or navigate as needed
    //   window.location.reload();
    }, 1500);
  };

  const handleError = (errorMessage: string) => {
    console.error("Payment error:", errorMessage);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Pay Monthly Dues
            </Typography>
            <Typography
              id="payment-modal-description"
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Complete your payment securely
            </Typography>
          </Box>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Loading state */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <CircularProgress sx={{ color: BRAND_COLORS.green, mb: 3 }} size={50} />
            <Typography variant="h6" sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}>
              Creating Payment Session
            </Typography>
            <Typography color="text.secondary" align="center">
              Please wait while we set up your secure payment...
            </Typography>
          </Box>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <Box sx={{ py: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "error.light",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <ErrorIcon sx={{ color: "error.main", fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Unable to Process Payment
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 320 }}>
                {error}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <Button 
                  variant="outlined" 
                  onClick={onClose}
                  fullWidth
                  sx={{
                    borderColor: "divider",
                    "&:hover": {
                      borderColor: BRAND_COLORS.green,
                    },
                  }}
                >
                  Close
                </Button>
                {onRetry && !error.includes("already paid") && (
                  <Button
                    variant="contained"
                    onClick={onRetry}
                    fullWidth
                    sx={{
                      bgcolor: BRAND_COLORS.green,
                      "&:hover": { 
                        bgcolor: BRAND_COLORS.greenDark,
                      },
                      fontWeight: 600,
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Already paid state */}
        {error?.includes("already paid") && (
          <Box sx={{ py: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "success.light",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <CheckCircleIcon sx={{ color: "success.main", fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                Payment Already Made
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 320 }}>
                You have already paid this month's due. Check your payment history for details.
              </Typography>
              <Button
                variant="contained"
                onClick={onClose}
                fullWidth
                sx={{
                  bgcolor: BRAND_COLORS.green,
                  "&:hover": { 
                    bgcolor: BRAND_COLORS.greenDark,
                  },
                  fontWeight: 600,
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}

        {/* Payment form */}
        {paymentIntent && !isLoading && !error && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntent.clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: BRAND_COLORS.green,
                  colorBackground: "#ffffff",
                  colorText: "#374151",
                  colorDanger: "#ef4444",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: "12px",
                  spacingUnit: "4px",
                },
              },
            }}
          >
            <StripePaymentForm
              clientSecret={paymentIntent.clientSecret}
              onSuccess={handleSuccess}
              onError={handleError}
              onClose={onClose}
              userEmail={userEmail}
              userName={userName}
              amount={paymentIntent.amount}
              currency={paymentIntent.currency}
            />
          </Elements>
        )}
      </Box>
    </Modal>
  );
};