import React, { useEffect, useState } from "react";
import { Box, Slide } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";

interface CustomSnackbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClear,
  onDelete
}) => {
  const [visible, setVisible] = useState(false);

  // Show snackbar when selection > 0
  useEffect(() => {
    if (selectedCount > 0) setVisible(true);
    else setVisible(false);
  }, [selectedCount]);

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "absolute",
          bottom: "75px",
          width: "80%",
          backgroundColor: "white",
          left: "10%",
          py: 2,
          px: 2.5,
          borderRadius: "6px",
          justifyContent: "space-between",
          border: ".5px solid #B0E8D9",
          boxShadow: "0px -2px 5px 0px #8F8F8F1A",
          zIndex: 1300,
          display: "flex",
          alignItems: "center"
        }}
      >
        <p className="font-montserrat text-sm text-aciu-darker-grey">
            {selectedCount} selected of   
            <span className="font-semibold"> {totalCount} posts</span>
        </p>
        <Box sx={{ display: "flex", gap: 1.5 }}>
            <button
                onClick={onSelectAll}
                className="h-8 rounded-md px-3 py-2 bg-white 
                  border border-[#B0E8D9]
                  text-xs text-aciu-green-normal font-coolvetica"
                >
                Select All
            </button>
            <button
                onClick={onClear}
                className="h-8 rounded-md px-3 py-2 bg-white 
                  border border-[#B0E8D9]
                  text-xs text-aciu-green-normal font-coolvetica"
                >
                Clear Selection
            </button>
            <button
                onClick={onDelete}
                className="flex gap-2 items-center h-8 
                px-3 py-2 bg-aciu-green-normal 
                border rounded-md text-xs text-white font-coolvetica"
                >
                Delete
                <ArrowDown2 size={16} color="white" />
            </button>
        </Box>
      </Box>
    </Slide>
  );
};
