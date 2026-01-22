import { copyTextToClipboard } from "@/utils/helpers";
import { Copy } from "iconsax-react";

export default function ViewCopyDetailRow({
    label, content, ariaLabel
}: {
    label: string,
    content: string,
    ariaLabel: string
}) {
    return (
        <tr>
            <td className="payment-table-column title whitespace-nowrap">{label}</td>
            <td className="payment-table-column">
                <span className=" flex items-center justify-between">
                    <span className="desc capitalize whitespace-nowrap truncate max-w-25 sm:max-w-45 md:max-w-60 text-xs md:text-sm">
                        {content}
                    </span>
                    <button
                        aria-label={ariaLabel}
                        onClick={() => copyTextToClipboard(content)}
                    >
                        <Copy variant="Bulk" size={20} color="#00B686" />
                    </button>
                </span>
            </td>
        </tr>
    )
}