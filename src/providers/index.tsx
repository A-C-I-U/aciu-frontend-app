import { UserProvider } from "@/context/UserContext"
import { SnackbarProvider } from "notistack"

export const Providers = (
    { children }: 
    { children: React.ReactElement}
) => {
    return (
       <UserProvider>
        <SnackbarProvider />
        {children}
       </UserProvider>
    )
}