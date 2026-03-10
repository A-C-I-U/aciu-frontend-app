function DetailCardSkeleton() {
  return (
    <div className="bg-aciu-light-yellow rounded-[1.25rem] h-48 min-w-72 px-6 flex flex-col relative w-full overflow-hidden">
      <div className="flex flex-col gap-2.5 lg:gap-3 justify-center h-full">
        <div className="h-5 w-5 rounded bg-black/10 animate-pulse" />
        <div className="h-3.5 w-24 rounded bg-black/10 animate-pulse" />
        <div className="h-6 w-36 rounded bg-black/10 animate-pulse" />
      </div>
      <picture>
        <source media="(min-width:1024px)" srcSet="/images/ellipse-one.png" />
        <img src="/images/ellipse-one-mobile.png" className="absolute right-0 top-6 lg:top-6 lg:bottom-auto object-cover opacity-30" alt="" />
      </picture>
      <picture>
        <source media="(min-width:1024px)" srcSet="/images/ellipse-two.png" />
        <img src="/images/ellipse-two-mobile.png" className="object-cover absolute bottom-0 right-0 opacity-30" alt="" />
      </picture>
    </div>
  )
}

export function EventDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6.25 mb-10">
      <div className="mx-5 mt-9 h-13.75 w-28 rounded-md bg-gray-200 animate-pulse" />

      <div className="mx-5 bg-white rounded-white py-4 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-5 px-4">
          <div className="rounded-2xs h-43.5 lg:h-77.5 w-full lg:w-116.25 bg-gray-200 animate-pulse shrink-0" />
          <div className="flex flex-col gap-4 w-full">
            <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="h-8 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-2/3 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="bg-aciu-bg-grey px-13.75 lg:px-22 py-13.75 mx-3 lg:mx-8.25 rounded-[1.25rem] flex flex-col gap-9 lg:flex-row lg:gap-0 items-center justify-between">
          {["Event Date", "Event Time", "Location"].map((label) => (
            <div key={label} className="flex flex-col gap-3 items-center lg:items-start">
              <div className="h-3.5 w-20 rounded bg-gray-300 animate-pulse" />
              <div className="h-4 w-32 rounded bg-gray-300 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full px-5">
          <div className="h-11 min-w-49 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-11 min-w-49 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center mx-5 lg:mx-8.5">
          {[0, 1, 2].map((i) => <DetailCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )
}