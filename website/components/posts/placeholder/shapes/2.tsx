export const Shape2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Circle Shape</title>
      <g clipPath="url(#clip0_119_275)">
        <path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z" />
      </g>
      <defs>
        <clipPath id="clip0_119_275">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
