import { memo, ReactElement } from "react";
import type { FC } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Search from "@/components/search";
export interface IProps {
  children?: ReactElement;
  // ...
}
const Navbar: FC<IProps> = memo(function (props) {
  return (
    <nav className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo}></Link>
          <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
        </div>
        <div className={styles["content-right"]}>
          <div className={styles["right-search"]}>
            <Search />
          </div>
          <div className={styles["right-cart"]}>
            <Link href="/" className={styles.cart}>
              <span className={styles.count}>0</span>
            </Link>
          </div>
          <div className={styles["right-login"]}>登录</div>
        </div>
      </div>
    </nav>
  );
});
export default Navbar;
Navbar.displayName = "Navbar"; // 方便以后调试用的
