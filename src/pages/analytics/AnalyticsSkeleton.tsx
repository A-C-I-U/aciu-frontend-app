import { Skeleton, Box } from "@mui/material";

export const AnalyticsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                        key={i}
                        variant="rounded"
                        width="100%"
                        height={140}
                        animation="wave"
                        sx={{ borderRadius: "0.5rem", flex: 1 }}
                    />
                ))}
            </div>

            <Box mx="1.25rem" className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2">
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={450}
                            animation="wave"
                            sx={{ borderRadius: "0.5rem" }}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={450}
                            animation="wave"
                            sx={{ borderRadius: "0.5rem" }}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={450}
                            animation="wave"
                            sx={{ borderRadius: "0.5rem" }}
                        />
                    </div>
                </div>

                <div>
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={400}
                        animation="wave"
                        sx={{ borderRadius: "0.5rem" }}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={350}
                        animation="wave"
                        sx={{ borderRadius: "0.5rem" }}
                    />
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={350}
                        animation="wave"
                        sx={{ borderRadius: "0.5rem" }}
                    />
                </div>
            </Box>
        </div>
    );
};
