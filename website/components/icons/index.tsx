import type * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export function ArrowUpRight({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <title>Arrow Up Right</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6.5C8 5.67157 8.67157 5 9.5 5H17.5C18.3284 5 19 5.67157 19 6.5V14.5C19 15.3284 18.3284 16 17.5 16C16.6716 16 16 15.3284 16 14.5V10.1213L7.56066 18.5607C6.97487 19.1464 6.02513 19.1464 5.43934 18.5607C4.85355 17.9749 4.85355 17.0251 5.43934 16.4393L13.8787 8H9.5C8.67157 8 8 7.32843 8 6.5Z"
        fill={color}
      />
    </svg>
  );
}

export function Fire({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <title>Fire icon</title>
      <path
        d="M12.0142 1.70807C11.7507 1.50497 11.4036 1.44614 11.088 1.55112C10.7723 1.65611 10.5296 1.91116 10.4403 2.23158C9.90268 4.16083 8.80022 5.22289 7.38331 6.58789C7.1924 6.7718 6.99579 6.96121 6.79407 7.15898L6.79335 7.15969C6.16354 7.77845 5.51349 8.47938 4.97951 9.27371C3.39474 11.6326 3.00524 14.3046 4.19193 16.9909L4.19239 16.992C6.17042 21.456 10.5982 22.7419 14.297 21.6104C18.0101 20.4744 21.0549 16.8981 20.415 11.744C20.2173 10.1386 19.6746 8.47873 18.3334 7.17122C18.1227 6.96584 17.8322 6.86366 17.5394 6.8919C17.2465 6.92014 16.9809 7.07593 16.8133 7.31778C16.6732 7.52011 16.3541 7.91009 15.9715 8.36098C15.9053 7.55854 15.7383 6.78655 15.4546 6.04124C14.8323 4.4062 13.6855 2.99673 12.0142 1.70807Z"
        fill={color}
      />
    </svg>
  );
}

export function Crown({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <title>Crown icon</title>
      <path
        d="M12.8321 3.4453C12.6466 3.1671 12.3344 3 12 3C11.6657 3 11.3534 3.1671 11.168 3.4453L7.65766 8.71078L2.44725 6.10557C2.10435 5.93412 1.69361 5.9738 1.38987 6.20773C1.08613 6.44165 0.942863 6.82864 1.02105 7.20395L3.02353 16.8158C3.40996 18.6707 5.04474 20 6.93945 20H17.0606C18.9553 20 20.5901 18.6707 20.9765 16.8158L22.979 7.20395C23.0572 6.82864 22.9139 6.44165 22.6102 6.20773C22.3065 5.9738 21.8957 5.93412 21.5528 6.10557L16.3424 8.71078L12.8321 3.4453Z"
        fill={color}
      />
    </svg>
  );
}

export function Toast({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <title>Toast icon</title>
      <path
        d="M12 3C9.37749 3 6.95383 3.5884 5.1504 4.59031C3.38084 5.5734 2 7.09122 2 9C2 10.4701 2.82568 11.7132 4 12.6468V17C4 19.2091 5.79086 21 8 21H16C18.2091 21 20 19.2091 20 17V12.6468C21.1743 11.7132 22 10.4701 22 9C22 7.09122 20.6192 5.5734 18.8496 4.59031C17.0462 3.5884 14.6225 3 12 3Z"
        fill={color}
      />
    </svg>
  );
}
