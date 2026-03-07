import useMenuContext from "@/context/MenuContext";
import { Menu as MuiMenu } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export type MenuAnchor = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type MenuProps = {
  closeOnClickOutside?: boolean;
  children: React.ReactNode | ((params: { open: boolean; close: () => void }) => React.ReactNode);
  offset?: number;
  anchor?: MenuAnchor;
  className?: string;
  onClose?: () => void;
  paperClassName?: string;
  verticalOffset?: number;
  horizontalOffset?: number;
  renderTrigger: (props: {
    open: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  }) => React.ReactNode;
};

export const anchorMap: Record<MenuAnchor, { anchorOrigin: any; transformOrigin: any }> = {
  "top-left": {
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "bottom", horizontal: "left" },
  },
  "top-center": {
    anchorOrigin: { vertical: "top", horizontal: "center" },
    transformOrigin: { vertical: "bottom", horizontal: "center" },
  },
  "top-right": {
    anchorOrigin: { vertical: "top", horizontal: "right" },
    transformOrigin: { vertical: "bottom", horizontal: "right" },
  },
  "bottom-left": {
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
  },
  "bottom-center": {
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    transformOrigin: { vertical: "top", horizontal: "center" },
  },
  "bottom-right": {
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    transformOrigin: { vertical: "top", horizontal: "right" },
  },
};


export default function Menu({
  onClose,
  children,
  renderTrigger,
  className = "",
  paperClassName,
  verticalOffset = 6,
  horizontalOffset = 0,
  anchor = "bottom-center",
  closeOnClickOutside = true,
}: MenuProps) {
  const { anchorEl, minWidth, open, context } = useMenuContext(onClose);
  const [paperRadius, setPaperRadius] = useState<string | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  const verticalOffsetRem = (verticalOffset / 16).toFixed(3);
  const horizontalOffsetRem = (horizontalOffset / 16).toFixed(3);

  const marginTop = anchor.startsWith("bottom")
    ? `${verticalOffsetRem}rem`
    : anchor.startsWith("top")
      ? `-${verticalOffsetRem}rem`
      : undefined;

  const marginLeft = anchor.endsWith("right")
    ? `-${horizontalOffsetRem}rem`
    : anchor.endsWith("left")
      ? `${horizontalOffsetRem}rem`
      : undefined;

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const el = menuRef.current;
      if (!el) return;
      const radius = getComputedStyle(el).borderRadius;
      setPaperRadius(radius || undefined);
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  return (
    <>
      {renderTrigger(context)}
      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={closeOnClickOutside ? context.close : undefined}
        anchorOrigin={anchorMap[anchor].anchorOrigin}
        transformOrigin={anchorMap[anchor].transformOrigin}
        slotProps={{
          paper: {
            style: {
              minWidth,
              marginTop,
              marginLeft,
              borderRadius: paperRadius,
            },
            className: `shadow-[0_10px_30px_0_rgba(0,0,0,0.04)]! ${paperClassName}`,
          },
          list: { component: "div", className: "[all:unset]!" },
          backdrop: { classes: { root: "cursor-pointer" } },
        }}
      >
        <div role="menu" ref={menuRef} className={className}>
          {typeof children === "function" ? children(context) : children}
        </div>
      </MuiMenu>
    </>
  );
}
