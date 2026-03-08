import { ArrowDown2, Check } from "iconsax-react";
import Menu from "./Menu";
import { cx } from "class-variance-authority";

export const years = [2022, 2023, 2024, 2025, 2026];
export const periods = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function FilterMenu<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (val: T) => void;
}) {
  return (
    <Menu
      anchor="bottom-left"
      paperClassName="!rounded-[.875rem] border border-stroke-01/70 !shadow-outer-modal"
      className="flex w-40 flex-col gap-4 bg-white p-4"
      renderTrigger={({ onClick, open }) => (
        <button
          onClick={onClick}
          className="section-action-button admin"
        >
          {value}
          <ArrowDown2
            color="#3E3E3E"
            size={14}
            className={cx("transition-transform duration-300 ease-in-out", open ? "rotate-180" : "")}
          />
        </button>
      )}
    >
      {() => (
        <>
          {options.map((opt) => (
            <button
              key={opt}
              role="radio"
              aria-checked={opt === value}
              onClick={() => onChange(opt)}
              className="flex cursor-pointer items-center gap-15 rounded-md bg-surface-primary p-8 font-copy font-medium text-body hover:bg-foreground-02"
            >
              {opt}
              <span className="relative ml-auto size-16">
                <span
                  className={cx(
                    "absolute inset-px rounded-full border-2 border-icon-default transition-all duration-200",
                    opt === value ? "opacity-0" : "opacity-100"
                  )}
                />
                <Check
                  width={16}
                  height={16}
                  className={cx(
                    "absolute inset-0 transition-all duration-200",
                    opt === value ? "opacity-100" : "opacity-0"
                  )}
                />
              </span>
            </button>
          ))}
        </>
      )}
    </Menu>
  );
}