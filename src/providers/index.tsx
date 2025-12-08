import { UserProvider } from "@/context/UserContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material"
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
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
