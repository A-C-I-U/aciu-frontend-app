import { UserProvider } from "@/context/UserContext"
import { SnackbarProvider } from "notistack"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Providers = (
    { children }: 
    { children: React.ReactElement}
) => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}