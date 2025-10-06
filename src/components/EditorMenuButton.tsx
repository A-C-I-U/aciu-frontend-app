





import { IconButton } from "@mui/material";
import { UndoLeftRound, UndoRightRound } from "@solar-icons/react";
import type { Editor } from "@tiptap/react";
import {
  TextHOne,
  TextHTwo,
  TextHThree,
  TextHFour,
  TextHFive,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextBolder,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  ListBullets,
  ListNumbers,
} from "phosphor-react";
import type React from "react";

// Types
export type Level = 1 | 2 | 3 | 4 | 5;
export type Alignment = "left" | "center" | "right";
export type ToggleAction = "bold" | "italic" | "underline" | "strike";
export type GenericAction = "undo" | "redo" | "bulletList" | "orderedList";

type ButtonKind =
  | { type: "heading"; level: Level }
  | { type: "alignment"; alignment: Alignment }
  | { type: "toggle"; action: ToggleAction }
  | { type: "generic"; action: GenericAction };

// Icon Maps
const headingIcons: Record<Level, React.ElementType> = {
  1: TextHOne,
  2: TextHTwo,
  3: TextHThree,
  4: TextHFour,
  5: TextHFive,
};

const alignmentIcons: Record<Alignment, React.ElementType> = {
  left: TextAlignLeft,
  center: TextAlignCenter,
  right: TextAlignRight,
};

const toggleIcons: Record<ToggleAction, React.ElementType> = {
  bold: TextBolder,
  italic: TextItalic,
  underline: TextUnderline,
  strike: TextStrikethrough,
};

const genericIcons: Record<GenericAction, React.ElementType> = {
  undo: UndoLeftRound,
  redo: UndoRightRound,
  bulletList: ListBullets,
  orderedList: ListNumbers,
};

// Fixed Editor Button Component
export const EditorButton = ({
  config,
  editor,
  ...props
}: {
  config: ButtonKind;
  editor: Editor;
  [key: string]: any;
}) => {
  let Icon: React.ElementType;
  let runCommand: () => boolean;
  let isActive = false;
  let isDisabled = false;
  let title = "";

  switch (config.type) {
    case "heading":
      Icon = headingIcons[config.level];
      runCommand = () => editor.commands.toggleHeading({ level: config.level });
      isActive = editor.isActive("heading", { level: config.level });
      isDisabled = !editor.can().toggleHeading({ level: config.level });
      title = `Heading ${config.level}`;
      break;

    case "alignment":
      Icon = alignmentIcons[config.alignment];
      runCommand = () => editor.commands.setTextAlign(config.alignment);
      isActive = editor.isActive({ textAlign: config.alignment });
      title = `Align ${config.alignment}`;
      break;

    case "toggle":
      Icon = toggleIcons[config.action];
      runCommand = () => {
        switch (config.action) {
          case "bold":
            return editor.commands.toggleBold();
          case "italic":
            return editor.commands.toggleItalic();
          case "underline":
            return editor.commands.toggleUnderline();
          case "strike":
            return editor.commands.toggleStrike();
          default:
            return false;
        }
      };
      isActive = editor.isActive(config.action);
      title = config.action[0].toUpperCase() + config.action.slice(1);
      break;

    case "generic":
      Icon = genericIcons[config.action];
      runCommand = () => {
        switch (config.action) {
          case "undo":
            return editor.commands.undo();
          case "redo":
            return editor.commands.redo();
          case "bulletList":
            return editor.commands.toggleBulletList();
          case "orderedList":
            return editor.commands.toggleOrderedList();
          default:
            return false;
        }
      };
      isActive =
        config.action === "bulletList"
          ? editor.isActive("bulletList")
          : config.action === "orderedList"
          ? editor.isActive("orderedList")
          : false;
      isDisabled =
        (config.action === "undo" && !editor.can().undo()) ||
        (config.action === "redo" && !editor.can().redo());
      title =
        config.action === "bulletList"
          ? "Bullet List"
          : config.action === "orderedList"
          ? "Numbered List"
          : config.action === "undo"
          ? "Undo"
          : "Redo";
      break;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    runCommand();
  };

  return (
    <IconButton
      onMouseDown={handleClick}
      disabled={isDisabled}
      title={title}
      sx={{
        color: "text-aciu-border-grey",
        backgroundColor: isActive ? "#e5e5e5" : "transparent",
        fontSize: "1.125rem",
        padding: "0",
        width: "30px",
        height: "30px",
      }}
    >
      <Icon size={20} {...props} />
    </IconButton>
  );
};
