import type { OptionLabelProps } from "./types";

export const BRANCHES: string[] = [
  "home", "aba", "umuahia", "enugu", "owerri",
  "lagos", "abuja", "atlanta", "houston",
  "london", "new-york", "toronto",
  "johannesburg", "dubai"
];

export const AGEGRADES: string[] = [
  "okpu-nnukwu", "ndi-udo", "ndi-ijeoma", 
  "uke-achara", "uke-ezinne", 
  "uke-progressive", "uke-unity"
]

export const genderOptions: OptionLabelProps[] = [
  { label: "Man", value: "man" },
  { label: "Woman", value: "woman" },
];

export const nigerianBranches: OptionLabelProps[] = [
  { label: "Home Branch", value: "home" },
  { label: "Aba Branch", value: "aba" },
  { label: "Umuahia Branch", value: "umuahia" },
  { label: "Enugu Branch", value: "enugu" },
  { label: "Owerri Branch", value: "owerri" },
  { label: "Lagos Branch", value: "lagos" },
  { label: "Abuja Branch", value: "abuja" },
];

export const abroadBranches: OptionLabelProps[] = [
  { label: "Atlanta Branch", value: "atlanta" },
  { label: "Houston Branch", value: "houston" },
  { label: "London Branch", value: "london" },
  { label: "New York Branch", value: "new-york" },
  { label: "Toronto Branch", value: "toronto" },
  { label: "Johannesburg Branch", value: "johannesburg" },
  { label: "Dubai Branch", value: "dubai" },
];

export const ageGradeOptions: OptionLabelProps[] = [
  { label: "Okpu Nnukwu", value: "okpu-nnukwu" },
  { label: "Ndi Udo", value: "ndi-udo" },
  { label: "Ndi Ijeoma", value: "ndi-ijeoma" },
  { label: "Uke Achara", value: "uke-achara" },
  { label: "Uke Ezinne", value: "uke-ezinne" },
  { label: "Uke Progressive", value: "uke-progressive" },
  { label: "Uke Unity", value: "uke-unity" },
];

export const locationOptions: OptionLabelProps[] = [
  { label: "Nigeria", value: "nigeria" },
  { label: "Abroad", value: "abroad" },
];

export const villageOptions: OptionLabelProps[] = [
  { label: "Ameke", value: "ameke" },
  { label: "Amogudu", value: "amogudu" },
  { label: "Agboji", value: "agboji" },
];
