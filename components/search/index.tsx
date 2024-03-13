import { memo, ReactElement, useState, KeyboardEvent, useReducer } from "react";
import type { FC } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { shallowEqual, useSelector } from "react-redux";
import { IAppRootState } from "@/store";
import { useRouter } from "next/router";

export interface IProps {
  children?: ReactElement;
  // ...
}
const Search: FC<IProps> = memo(function (props) {
  const router = useRouter();
  const suggestInfo = useSelector(
    (state: IAppRootState) => state.home.navbarSuggest,
    shallowEqual
  );

  const [isFocus, setIsFocus] = useState(false);
  const [suggest, setSuggest] = useState(suggestInfo.defaultKey || "蓝牙耳机");

  const focusHandle = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const keyDownHandle = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      // 执行搜索...
      goSearch(value);
      setIsFocus(false);
    }
  };

  const suggestClickHandle = (value: string) => {
    setSuggest(value);
    goSearch(value);
  };

  const goSearch = (value: string) => {
    router.push({
      pathname: "/search",
      query: {
        q: value,
      },
    });
  };

  return (
    <div className={styles.search}>
      <div className={styles["search-bg"]}>
        <input
          type="text"
          className={styles.input}
          placeholder={suggest}
          onBlur={() => focusHandle(false)}
          onFocus={() => focusHandle(true)}
          onKeyDown={keyDownHandle}
        />
      </div>
      {/* 下拉的面板 */}
      <div
        className={classNames(
          styles["search-panel"],
          styles[isFocus ? "show" : "hide"]
        )}
      >
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
          {suggestInfo.configKey &&
            suggestInfo.configKey.map((item, index) => {
              return (
                <li
                  key={item[index + 1]}
                  onMouseDown={() => suggestClickHandle(item[index + 1])}
                >
                  {item[index + 1]}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

export default Search;
Search.displayName = "Search"; // 方便以后调试用的
