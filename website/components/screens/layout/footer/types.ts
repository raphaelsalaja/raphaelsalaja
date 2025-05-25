interface FooterProps {
  direction: number;
  variants: {
    enter: (dir: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (dir: number) => { x: number; opacity: number };
  };
}
