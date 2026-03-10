export function BlogPostCardSkeleton() {
  return (
    <div className="animate-pulse border border-aciu-light-grey rounded-2xs py-2 px-2 flex flex-col gap-4 w-full">
      <div className="w-full h-60 rounded-2xs bg-gray-200" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="h-4 w-1/3 rounded bg-gray-200" />

          <div className="flex justify-between items-center">
            <div className="h-6 w-2/3 rounded bg-gray-200" />
            <div className="size-6 rounded bg-gray-200" />
          </div>


          <div className="flex flex-col gap-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-6 w-16 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}


export function PostViewHeaderSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-5.5 lg:gap-6">
      <div className="flex items-center gap-2 mt-5">
        <div className="h-8 w-16 rounded bg-gray-200" />
        <div className="h-8 w-2/5 rounded bg-gray-200" />
      </div>

      <div className="flex gap-12 items-center">
        <div className="flex gap-2 items-center">
          <div className="size-8 rounded-full bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}


export function PostViewerSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 min-h-[80dvh] w-full bg-white rounded-2xs py-6.5 px-6.5">
      <div className="h-6 w-3/4 rounded bg-gray-200" />
      <div className="h-6 w-full rounded bg-gray-200" />
      <div className="h-6 w-5/6 rounded bg-gray-200" />
      <div className="h-6 w-full rounded bg-gray-200" />
      <div className="h-6 w-2/3 rounded bg-gray-200" />
      <div className="mt-4 h-6 w-full rounded bg-gray-200" />
      <div className="h-6 w-4/5 rounded bg-gray-200" />
      <div className="h-6 w-full rounded bg-gray-200" />
    </div>
  );
}


export function ShareSectionSkeleton() {
  return (
    <div className="animate-pulse w-full bg-white rounded-2xs py-5 px-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-28 rounded bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
        <div className="h-16 w-full rounded-[6.25rem] bg-gray-200" /> 
        {Array.from({ length: 3 }).map((_, i) => (
            <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}