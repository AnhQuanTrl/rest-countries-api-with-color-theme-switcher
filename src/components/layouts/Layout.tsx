import React from "react";
import Center from "./Center";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      <Header />
      <Center as="main">{children}</Center>
    </div>
  );
}

export default Layout;
