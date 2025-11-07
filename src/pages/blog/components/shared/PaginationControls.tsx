import { Pagination } from "@heroui/react";
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

    return (
        <div className="w-full pt-3 pb-4 px-6 flex justify-between items-center">
            <button
                className="rounded-md py-2 px-3.5 
                flex gap-2 justify-center items-center
                shadow-[0px_1px_2px_0px_#1018280D] border
                border-grayscale-300"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                <ArrowLeftIcon size={20} color="#00B686" />
            </button>

            <Pagination
                total={totalPages}
                page={page}
                onChange={onPageChange}
                classNames={{ cursor: "hidden" }}
                renderItem={(item) => {
                    const isActive = item.page === page;
                    return (
                    <button
                        key={item.key}
                        onClick={
                            item.onPress as unknown as React.MouseEventHandler<HTMLButtonElement>
                        }
                        className={`w-10 h-10 rounded-md
                            ${isActive ? "bg-aciu-green-light" : ""}
                            rounded-md text-aciu-new-green-normal hover:bg-aciu-green-light font-inter`}
                    >
                        {item.page || item.children}
                    </button>
                    );
                }}
            />

            <button
                className="rounded-md py-2 px-3.5
                flex gap-2 justify-center items-center
                shadow-[0px_1px_2px_0px_#1018280D] border
                border-grayscale-300 text-green-normal"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
            >
                <ArrowRightIcon size={20} color="#00B686" />
            </button>
        </div>
    );
}
