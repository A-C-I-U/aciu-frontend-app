import React from "react";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ScrollLock } from "./ScrollLock";
import { DialogTitle } from "@mui/material";

interface ShellProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  paperSx?: object;
  drawerSx?: object;
  forceDrawer?: boolean;
  forceDialog?: boolean;
}

export default function ShellModal({
  open,
  onClose,
  children,
  paperSx = {},
  drawerSx = {},
  forceDrawer = false,
  forceDialog = false,
}: ShellProps) {
  const isMobile = useMediaQuery("(max-width:768px)");

  const defaultDialogSx = {
    "& .MuiDialog-paper": {
      overflow: "hidden",
      width: { xs: "92%", md: "38.25rem" },
      margin: "0 auto",
      borderRadius: "1.25rem",
      maxHeight: "none",
      height: "90dvh",
      display: "flex",
      flexDirection: "column",
    },
    ...paperSx,
  };

  const defaultDrawerSx = {
    "& .MuiDrawer-paper": {
      width: {
        md: "50%",
        lg: "40%",
      },
      maxWidth: "70%",
      display: "flex",
      flexDirection: "column",
    },
    ...drawerSx,
  };

  const useDrawer = !isMobile && !forceDrawer && !forceDialog;

  return (
    <>
      <ScrollLock open={open} />

      {useDrawer ? (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          disableScrollLock={false}
          sx={defaultDrawerSx}
          variant="temporary"
          disableRestoreFocus
        >
          <h2 tabIndex={-1} className="hidden">
            Title
          </h2>
          {children}
        </Drawer>
      ) : (
        <Dialog
          disableRestoreFocus
          open={open}
          onClose={onClose}
          disableScrollLock={false}
          sx={defaultDialogSx}
        >
          <DialogTitle sx={{ display: "none" }}></DialogTitle>
          {children}
        </Dialog>
      )}
    </>
  );
}
