import { Card, CardContent } from "@mui/material";

interface AuthCardProps {
    header?: string,
    subheader?: React.ReactNode,
    cardFooter?: boolean,
    optionalHeader?: boolean,
    optionalCardHeader?: React.ReactElement,
    children: React.ReactElement;
}


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
                className="min-h-fit w-[31.25rem] rounded-[1.25rem] border border-aciu-card-grey p-8 flex flex-col gap-6 card-shadow"
                sx={{
                    borderRadius: '1.25rem',
                    "& .MuiCardContent-root": {
                        padding: 0
                    }
                }}
            >
                {!optionalHeader ? (
                    <div className="flex flex-col">
                        <h1 className="font-coolvetica text-aciu-border-grey font-bold text-[2rem]">{header}</h1>
                        <p className="font-montserrat text-aciu-neutral font-normal">{subheader}</p>
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