export const LegendItem = ({ color, label, weight=400 }: { color: string, label: string, weight?: number }) => {
    return (
        <div className="flex items-center gap-2 text-xs md:text-sm leading-[160%] md:leading-[140%] text-aciu-border-grey" style={{ fontWeight: weight }}>
            <span
                className="w-3 h-3 inline-block rounded-xs"
                style={{ backgroundColor: color }}
            ></span>
            {label}
        </div>
    )
}