import type { SVGProps } from "react";

export const ArrowTopRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.60609 3.60609L2.69695 4.51523C2.36222 4.84996 1.81951 4.84996 1.48477 4.51523C1.15004 4.18049 1.15004 3.63778 1.48477 3.30305L2.39391 2.39391L0 0H6V6L3.60609 3.60609Z"
      fill="currentColor"
    />
  </svg>
);


export const TrashIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="56" height="56" rx="28" fill="#F72A30"/>
      <rect x="5" y="5" width="56" height="56" rx="28" stroke="#FFEAEB" stroke-width="10"/>
      <path d="M30 43H36C41 43 43 41 43 36V30C43 25 41 23 36 23H30C25 23 23 25 23 30V36C23 41 25 43 30 43Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38.9001 30.0488C36.7201 29.8288 34.5201 29.7188 32.3301 29.7188C31.0301 29.7188 29.7301 29.7887 28.4401 29.9187L27.1001 30.0488" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30.7102 29.3895L30.8502 28.5294C30.9502 27.9094 31.0302 27.4395 32.1402 27.4395H33.8602C34.9702 27.4395 35.0502 27.9294 35.1502 28.5294L35.2902 29.3795" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M37.49 30.1289L37.06 36.7289C36.99 37.7589 36.93 38.5589 35.1 38.5589H30.89C29.06 38.5589 29 37.7589 28.93 36.7289L28.5 30.1289" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
  )
}


export const CloudIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.678 20.271C7.275 21.318 4 25.277 4 30C4 35.523 8.477 40 14 40C14.947 40 15.864 39.868 16.733 39.622M36.055 20.271C40.458 21.318 43.732 25.277 43.732 30C43.732 35.523 39.255 40 33.732 40C32.785 40 31.868 39.868 31 39.622M36 20C36 13.373 30.627 8 24 8C17.373 8 12 13.373 12 20M17.065 27.881L24 20.924L31.132 28M24 38V24.462" stroke="#00B686" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}