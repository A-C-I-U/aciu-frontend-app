import { X } from "lucide-react";

export default function ShellHeader({ title, onClose }: { title: string, onClose: () => void }) {
    return (
        <div className="relative flex items-center justify-between flex-shrink-0">
            <p className="resources-modal-title">
                {title}
            </p>
            <button onClick={onClose} className="resources-modal-close">
                <X width={24} height={24} color="#3E3E3E" />
            </button>
        </div>
    )
}