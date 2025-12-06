import { UserProvider } from "@/context/UserContext"
import { ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { theme } from "@/utils/theme";

export const Providers = (
    { children }: 
    { children: React.ReactElement}
) => {
    return (
       <UserProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider />
                {children}
            </ThemeProvider>
       </UserProvider>
    )
}