import { Pagination, PaginationItemType } from "@heroui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type PaginationControlsProps = {
    total: number;
    page: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
};

export function PaginationControls({
    total,
    page,
    onPageChange,
    itemsPerPage,
}: PaginationControlsProps) {
    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePress = (onPress: any) => (e: any) => {
        onPress(e);
        window.scrollTo({ top: 675, behavior: "smooth" });
    };

    return (
        <div className="w-full pt-3 mx-auto pb-4 flex justify-center relative items-center">
            <button
                className="rounded-md py-1.5 px-2.5 
                flex gap-2 justify-center items-center
                shadow-[0px_1px_2px_0px_#1018280D] border
                border-grayscale-300 absolute left-2"
                onClick={() => {
                    onPageChange(page - 1);
                    window.scrollTo({ top: 675, behavior: "smooth" });
                }}
                disabled={page === 1}
            >
                <ArrowLeftIcon size={20} color="#00B686" />
            </button>

            <Pagination
                total={totalPages}
                page={page}
                onChange={onPageChange}
                showControls={false}
                siblings={1}
                boundaries={1}
                size="lg"
                showShadow={false}
                classNames={{ cursor: "hidden", item: "bg-transparent" }}
                renderItem={({ key, page, onPress, children, value, isActive }) => {
                    
                    if (value === PaginationItemType.DOTS) {
                        return (
                            <span 
                                key={key}
                                className="w-10 h-10 flex items-center justify-center text-aciu-new-green-normal"
                            >
                                ...
                            </span>
                        );
                    }
                    
                    return (
                        <button
                            key={key}
                            onClick={handlePress(onPress)}
                            className={`w-8 h-8 rounded-md
                                ${isActive ? "bg-aciu-green-light" : ""}
                                text-aciu-new-green-normal hover:bg-aciu-green-light font-inter`}
                        >
                            {page || children}
                        </button>
                    );
                }}
            />

            <button
                className="rounded-md py-1.5 px-2.5 absolute right-2
                flex gap-2 justify-center items-center
                shadow-[0px_1px_2px_0px_#1018280D] border
                border-grayscale-300 text-green-normal"
                onClick={() => {
                    onPageChange(page + 1);
                    window.scrollTo({ top: 675, behavior: "smooth" });
                }}
                disabled={page >= totalPages}
            >
                <ArrowRightIcon size={20} color="#00B686" />
            </button>
        </div>
    );
}