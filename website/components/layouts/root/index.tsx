export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <main data-animate>{children}</main>
    </body>
  );
};
