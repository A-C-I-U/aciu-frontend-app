import { useState, type MouseEvent, type PointerEvent } from "react";

const useMenuContext = (onClose?: () => void) => {
  const [minWidth, setMinWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleCaptureWidth = (e: PointerEvent<HTMLElement>) => {
    setMinWidth(e.currentTarget.getBoundingClientRect().width);
  };

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return {
    open,
    anchorEl,
    minWidth,
    context: {
      open,
      close: handleClose,
      onClick: handleOpen,
      onPointerDown: handleCaptureWidth,
    },
  };
};

export default useMenuContext;
