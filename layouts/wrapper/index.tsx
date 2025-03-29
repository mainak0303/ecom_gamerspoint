import React, { ReactNode } from "react";
import ResponsiveAppBar from "../header";
import Footer from "../footer";



interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar/>
      {children}
      <Footer/>
    </div>
  );
};

export default Wrapper;
