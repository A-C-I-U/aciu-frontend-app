import type { AuthCardProps } from "@/utils/types";
import { Card, CardContent } from "@mui/material";




export default function AuthCard({
    header,
    subheader,
    cardFooter = false,
    optionalHeader = false,
    optionalCardHeader,
    children
}: AuthCardProps) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <Card 
                elevation={0}
                className="min-h-fit rounded-[1.25rem] border border-aciu-card-grey py-7 px-6 md:py-8 md:px-8 flex flex-col gap-6 card-shadow"
                sx={{
                    boxShadow: `
                        14px 0px 30px 0px #9191911A,
                        55px 0px 55px 0px #91919117,
                        124px 0px 74px 0px #9191910D,
                        220px 0px 88px 0px #91919103,
                        344px 0px 96px 0px #91919100
                    `,
                    borderRadius: '1.25rem',
                    width: { xs: "100%", md: "none"},
                    maxWidth: { xs: "none", md: "31.25rem" },
                    "& .MuiCardContent-root": {
                        padding: 0
                    }
                }}
            >
                {!optionalHeader ? (
                    <div className="flex flex-col gap-3 md:gap-1">
                        <h1 className="text-aciu-border-grey font-bold text-2xl md:text-[2rem] leading-[120%]">{header}</h1>
                        <p className="text-aciu-neutral text-xs md:text-base leading-[160%]">{subheader}</p>
                    </div>
                ) : (
                    <>{optionalCardHeader}</>
                )}
                <CardContent>
                    {children}
                </CardContent>
            </Card>
            {cardFooter && (
                <p>
                    Already have an account?
                    <span className="text-aciu-red"> Sign in</span>
                </p>
            )}
        </div>
    )
}