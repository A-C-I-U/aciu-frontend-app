import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { theme } from "@/utils/theme";

const queryClient = new QueryClient();


export const Providers = ({ children }: { children: React.ReactElement }) => {
  return (
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                  maxSnack={3}
                  autoHideDuration={4000}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {children}    
                  </LocalizationProvider>
                </SnackbarProvider>
            </ThemeProvider>
          </UserProvider>
        </QueryClientProvider>
  );
};
