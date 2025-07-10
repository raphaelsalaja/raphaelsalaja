import type { JSX } from "react";

export function Code(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <title>Code Icon</title>
      <path
        d="M10 20L14 4M18 8.00004L19.9775 9.75781C21.32 10.9512 21.32 13.0489 19.9775 14.2423L18 16M6 16L4.02251 14.2423C2.67996 13.0489 2.67996 10.9512 4.02251 9.75781L6 8.00004"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Terminal(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <title>Terminal Icon</title>
      <path
        d="M7.5 8L9.25 9.75L7.5 11.5M12 11.5H14M7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Clipboard(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <title>Clipboard Icon</title>

      <path
        d="M15 9V5.25C15 4.00736 13.9926 3 12.75 3H5.25C4.00736 3 3 4.00736 3 5.25V12.75C3 13.9926 4.00736 15 5.25 15H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 9H11.25C10.0074 9 9 10.0074 9 11.25V18.75C9 19.9926 10.0074 21 11.25 21H18.75C19.9926 21 21 19.9926 21 18.75V11.25C21 10.0074 19.9926 9 18.75 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <title>Check Icon</title>
      <path d="M8 13L11 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
