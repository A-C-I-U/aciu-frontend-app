import { useMediaQuery } from "@mui/material"
import { cx } from "class-variance-authority";

export default function BranchDashboardSkeleton() {
  const isMedium = useMediaQuery("(max-width: 1250px)");

  return (
    <div className="w-full relative flex flex-col items-center gap-5.5 animate-pulse">
      <div className={cx("flex flex-col gap-4 items-center ", isMedium && "w-full bg-white py-6 px-7.5")}>
        <div className="size-17 rounded-full bg-gray-200" />
        <div className="h-6 w-48 bg-gray-200 rounded-md" />

        <div className="flex items-center gap-4">
          <div className="h-8 w-36 bg-gray-200 rounded-full" />
          <div className="h-8 w-38 bg-gray-200 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full">
          <div className="h-4.25 w-32 bg-gray-200 rounded-md" />
          <div className="h-5 w-full bg-gray-200 rounded-md" />
        </div>

        <div className="h-10 w-32 bg-gray-200 rounded-lg" />
      </div>

      {isMedium &&
        <div className="flex flex-col gap-4 w-full mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full h-17 bg-gray-200 rounded-2xs" />
          ))}
        </div>
      }
    </div>
  )
}