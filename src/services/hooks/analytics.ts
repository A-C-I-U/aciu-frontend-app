import { useQuery } from "@tanstack/react-query";
import { getNationalAnalytics } from "../analytics";

export const useNationalAnalytics = () => {
    return useQuery({
        queryKey: ["national-analytics"],
        queryFn: getNationalAnalytics,
    });
};
