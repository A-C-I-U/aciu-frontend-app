import { Skeleton, Box } from "@mui/material";

export const EventItemSkeleton = () => {
    return (
        <Box className="flex flex-col gap-4 rounded-lg border border-aciu-dark-grey py-2.5 px-2 lg:px-3.5">
            <Box className="flex flex-col gap-3.5">
                <Skeleton 
                    variant="rounded" 
                    width="100%" 
                    height={192} 
                    animation="wave"
                />
                
                <Box className="flex flex-wrap gap-2">
                    <Skeleton 
                        variant="rounded" 
                        width={96} 
                        height={28} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="rounded" 
                        width={80} 
                        height={28} 
                        animation="wave"
                    />
                </Box>
            </Box>
            
            <Box className="flex flex-col gap-4">
                <Skeleton 
                    variant="text" 
                    width="75%" 
                    height={32} 
                    animation="wave"
                />
                
                <Box className="flex items-center gap-2">
                    <Skeleton 
                        variant="circular" 
                        width={16} 
                        height={16} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="text" 
                        width={128} 
                        height={20} 
                        animation="wave"
                    />
                </Box>
                
                <Box className="space-y-2">
                    <Skeleton 
                        variant="text" 
                        width="100%" 
                        height={16} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="text" 
                        width="90%" 
                        height={16} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="text" 
                        width="80%" 
                        height={16} 
                        animation="wave"
                    />
                </Box>

                <Box className="flex flex-wrap gap-2">
                    <Skeleton 
                        variant="rounded" 
                        width={80} 
                        height={24} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="rounded" 
                        width={64} 
                        height={24} 
                        animation="wave"
                    />
                    <Skeleton 
                        variant="rounded" 
                        width={96} 
                        height={24} 
                        animation="wave"
                    />
                </Box>
                
                <Box className="flex justify-between items-center">
                    <Box className="flex flex-col gap-2">
                        <Skeleton 
                            variant="text" 
                            width={64} 
                            height={16} 
                            animation="wave"
                        />
                        <Skeleton 
                            variant="text" 
                            width={80} 
                            height={20} 
                            animation="wave"
                        />
                    </Box>
                    <Skeleton 
                        variant="rectangular" 
                        width={2} 
                        height={32} 
                        animation="wave"
                    />
                    <Box className="flex flex-col gap-2">
                        <Skeleton 
                            variant="text" 
                            width={64} 
                            height={16} 
                            animation="wave"
                        />
                        <Skeleton 
                            variant="text" 
                            width={64} 
                            height={20} 
                            animation="wave"
                        />
                    </Box>
                </Box>
                
                <Skeleton 
                    variant="rounded" 
                    width={128} 
                    height={48} 
                    animation="wave"
                />
            </Box>
        </Box>
    );
};
