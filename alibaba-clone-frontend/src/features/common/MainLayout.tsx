import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "85vh" }}>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
