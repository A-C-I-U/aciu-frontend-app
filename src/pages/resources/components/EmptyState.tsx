import EmptyStateImage from "/images/empty-state.png";

export default function EmptyState({ prompt }: { prompt: string}) {
    return (
        <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            flex flex-col gap-8"
            >
                <img
                    src={EmptyStateImage}
                    alt="Empty State Illustration"
                    className="object-cover w-full"
                />
                <p className="text-aciu-abriba text-sm font-montserrat font-semibold">
                    No Results for {prompt}
                </p>
            </div>
        </div>
    )
}