export function AnalyticsLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex-1 w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39 animate-pulse">
            <div className="flex flex-col justify-between h-full gap-3">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-6" />
            <div className="h-48 bg-gray-100 rounded w-full" />
          </div>
          {[1, 2].map((item) => (
            <div key={item} className="lg:col-span-1 bg-white rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="h-40 bg-gray-100 rounded-full mx-auto w-40" />
            </div>
          ))}
        </div>

        <div className="my-6 bg-white rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-3 bg-gray-200 rounded w-1/5 mb-6" />
          <div className="h-56 bg-gray-100 rounded w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white rounded-lg p-6  animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-6" />
              <div className="h-48 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}