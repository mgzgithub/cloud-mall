import { memo, ReactElement } from "react";
import type { FC } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

export interface IProps {
  children?: ReactElement;
  // ...
}
const Layout: FC<IProps> = memo(function (props) {
  const { children } = props;
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
});
export default Layout;
Layout.displayName = "Layout"; // 方便以后调试用的
