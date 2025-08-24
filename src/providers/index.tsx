import { UserProvider } from "@/context/UserContext"

export const Providers = (
    { children }: 
    { children: React.ReactElement}
) => {
    return (
       <UserProvider>
        {children}
       </UserProvider>
    )
}