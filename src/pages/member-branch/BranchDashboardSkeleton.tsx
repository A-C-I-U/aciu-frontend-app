export default function BranchDashboardSkeleton() {
  return (
    <div className="relative flex flex-col gap-5.5 animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="h-6 w-48 bg-gray-200 rounded-md" />

        <div className="flex items-center gap-2">
          <div className="h-8 w-36 bg-gray-200 rounded-full" />
          <div className="h-8 w-36 bg-gray-200 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="h-4 w-28 bg-gray-200 rounded-md" />
          <div className="h-4 w-64 bg-gray-200 rounded-md" />
        </div>

        <div className="h-11 w-full bg-gray-200 rounded-lg" />
      </div>

      <div className="flex flex-col gap-4 w-full mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-19 bg-gray-200 rounded-2xs" />
        ))}
      </div>
    </div>
  )
}