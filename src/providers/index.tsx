import { UserProvider } from "@/context/UserContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {children}
        </SnackbarProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
