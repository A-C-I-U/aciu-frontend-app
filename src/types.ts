import type { ElementType } from "react";

// Base types for flexbox properties
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'column' | 'col-reverse' | 'column-reverse';
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | string;

// Generic type for UI layout components
export interface GenericProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType
}

