export default function ErrorState({
    label
}: { label: string}) {
    return (
        <div className="text-center py-8 text-red-500">
            Failed to load {label}. Please try again.
        </div>
    )
}