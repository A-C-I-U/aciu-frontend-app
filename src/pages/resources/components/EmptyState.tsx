import EmptyStateImage from "/images/empty-state.png";

export default function EmptyState({ prompt }: { prompt: string}) {
    return (
        <div className="w-full min-h-[60dvh] relative flex items-center justify-center">
            <div className="max-w-57 max-h-62.5
            flex flex-col gap-8 items-center justify-center"
            >
                <img
                    src={EmptyStateImage}
                    alt="Empty State Illustration"
                    className="object-cover w-full"
                />
                <p className="text-center text-aciu-abriba text-sm font-montserrat font-semibold">
                    No results for {prompt}
                </p>
            </div>
        </div>
    )
}