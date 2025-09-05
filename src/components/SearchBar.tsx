import { debounce } from "@mui/material";
import { Search } from "lucide-react";
import { useCallback } from "react";

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
  onSearch: (query: string) => void;
}

export default function SearchBar({ 
    placeholder, 
    debounceMs=400, 
    onSearch 
}: SearchBarProps) {
    
    const debouncedSearch = useCallback(
        debounce((value: string) => onSearch(value), debounceMs),
        [onSearch, debounceMs]
    );


    return (
        <div className="py-4 px-6 flex gap-3 items-center rounded-[.625rem] border border-aciu-card-grey bg-grayscale-25 min-w-[428px] max-h-[50px]">
            <Search width={"18px"} height={"18px"} size={18} color="#0000004D" />
            <input
                type="text"
                placeholder={placeholder}
                role="searchbox"
                className="font-montserrat text-sm p-0 outline-0 border-0 w-full"
                onChange={(e) => debouncedSearch(e.target.value)}
            />
        </div>
    )
}