import { Skeleton, Box } from "@mui/material";

export const GallerySkeleton = () => {
    return (
        <Box className="grid gap-x-3.5 gap-y-4 md:grid-cols-2 md:max-w-150 lg:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:max-w-full overflow-y-auto no-scrollbar w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                    key={i}
                    variant="rounded"
                    width="100%"
                    height={206}
                    animation="wave"
                    sx={{ borderRadius: "0.5rem" }}
                />
            ))}
        </Box>
    );
};
