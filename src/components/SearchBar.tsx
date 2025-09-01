import { Input } from "@mui/material";
import { SearchNormal } from "iconsax-react";
import { useState } from "react";

interface SearchBarProps {
    placeholder: string
}

export default function SearchBar({ placeholder }: SearchBarProps) {
    const [ searchTerm, setSearchTerm ] = useState("");

    return (
        <div className="py-4 px-6 flex gap-3 items-center rounded-[.625rem] border border-grayscale-100 bg-grayscale-25 min-w-[428px]">
            <SearchNormal width={"18px"} height={"18px"} size={18} color="#9F9C9C" />
            <input
                type="text"
                placeholder={placeholder}
                // sx={{
                //     borderColor: "none",
                //     border: "none",
                //     backgroundColor: "none",
                //     fontSize: ".875rem",
                //     color: "#9F9C9C",
                //     fontFamily: "Montserrat"
                // }}
                value={searchTerm}
                className="font-montserrat text-sm p-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}