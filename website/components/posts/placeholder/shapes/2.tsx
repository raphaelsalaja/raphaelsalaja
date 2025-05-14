export const Shape2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Complex Star Shape</title>
      <path
        d="M100.106 0L115 54.1591L158.884 19.0983L139.1 71.6687L195.211 69.0983L148.306 100L195.211 130.902L139.1 128.331L158.884 180.902L115 145.841L100.106 200L85.211 145.841L41.3271 180.902L61.111 128.331L5 130.902L51.9057 100L5 69.0983L61.111 71.6687L41.3271 19.0983L85.211 54.1591L100.106 0Z"
        fill="inherit"
      />
    </svg>
  );
};
