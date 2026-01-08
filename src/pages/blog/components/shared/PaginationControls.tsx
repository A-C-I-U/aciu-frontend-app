import { scrollToPosition } from "@/utils/helpers";
import { Pagination, PaginationItemType } from "@heroui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type PaginationControlsProps = {
    total: number;
    page: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    desktop?: boolean
};

export function PaginationControls({
    total,
    page,
    onPageChange,
    itemsPerPage,
    desktop
}: PaginationControlsProps) {
    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePress = (onPress: any) => (e: any) => {
        onPress(e);
        scrollToPosition(!!desktop);
    };

    return (
        <div className="w-full pt-3 mx-auto pb-4 flex justify-center relative items-center">
            <button
                className="rounded-md py-1.5 px-2.5 
                flex gap-2 justify-center items-center hover:bg-aciu-green-light
                shadow-[0px_1px_2px_0px_#1018280D] border text-sm
                border-aciu-green-normal absolute left-2 text-aciu-green-normal"
                onClick={() => {
                    onPageChange(page - 1);
                    scrollToPosition(!!desktop);
                }}
                disabled={page === 1}
            >
                <ArrowLeftIcon size={20} color="#00B686" />
                {desktop && "Previous"}
            </button>

            <Pagination
                total={totalPages}
                page={page}
                onChange={onPageChange}
                showControls={false}
                siblings={0}
                boundaries={1}
                size="lg"
                classNames={{ cursor: "hidden" }}
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
                flex gap-2 justify-center items-center hover:bg-aciu-green-light
                shadow-[0px_1px_2px_0px_#1018280D] border text-sm
                border-aciu-green-normal text-aciu-green-normal"
                onClick={() => {
                    onPageChange(page + 1);
                    scrollToPosition(!!desktop);
                }}
                disabled={page >= totalPages}
            >
                {desktop && "Next"}
                <ArrowRightIcon size={20} color="#00B686" />
            </button>
        </div>
    );
}