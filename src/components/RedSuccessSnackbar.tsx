import { Alert } from "@mui/material";

export function RejectionSuccessSnackbar({ message, ...props }: any) {
  return (
    <Alert
        severity="success"
        sx={{ bgcolor: '#FF0707', color: '#FFF', fontWeight: 500 }}
        variant="filled"
        {...props}
    >
        {message}
    </Alert>
  );
}