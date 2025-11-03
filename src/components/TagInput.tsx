import { useState, useRef } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add a tag...",
  disabled = false,
  className = "",
}: TagInputProps) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || value.includes(clean)) return;
    onChange([...value, clean]);
    setDraft("");
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const disabledClass =
    disabled || value.length === 0 ? "pointer-events-none" : "";

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex flex-wrap items-center gap-2 border border-aciu-card-grey rounded-[.625rem] px-3 py-2 bg-white transition ${className} ${disabledClass}`}
    >
      {value.map((tag, index) => (
        <div
          key={index}
          className="rounded-2xl capitalize flex items-center gap-1 bg-aciu-light-grey leading-5 text-aciu-abriba font-medium px-2.5 py-1 text-xs"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-aciu-abriba focus:outline-none text-2xl"
            >
              ×
            </button>
          )}
        </div>
      ))}

      {!disabled && (
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border-none focus:outline-none text-sm min-w-[100px]"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length ? "" : placeholder}
        />
      )}
    </div>
  );
}
