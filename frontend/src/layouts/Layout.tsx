import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-1 mx-auto py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
