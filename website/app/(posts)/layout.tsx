import React from "react";

export default function Layout({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      {breadcrumb}
      {children}
    </React.Fragment>
  );
}
