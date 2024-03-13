import { IBanner } from "@/service/home";
import { Carousel } from "antd";
import { memo, ReactElement, useRef, useState } from "react";
import type { ElementRef, FC } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "next/image";

export interface IProps {
  banners?: IBanner[];
  // ...
}
const Swiper: FC<IProps> = memo(function (props) {
  const { banners } = props;

  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);

  const changePage = (page: number) => {
    page > 0 ? bannerRef.current?.next() : bannerRef.current?.prev();
  };

  return (
    <div className={styles["top-swiper"]}>
      <div className={classNames("wrapper", styles.content)}>
        <Carousel
          ref={bannerRef}
          className={styles.carousel}
          autoplay
          autoplaySpeed={3000}
          fade
        >
          {banners?.map(banner => {
            return (
              <div key={banner.id} className={styles["swiper-item"]}>
                {/* 背景 */}
                <div
                  className={styles["swiper-bg"]}
                  style={{
                    backgroundImage: `url(${banner.backendPicStr})`,
                  }}
                ></div>
                <Image
                  className={styles.image}
                  src={banner.picStr!}
                  alt="banner"
                  width={1100}
                  height={480}
                ></Image>
              </div>
            );
          })}
        </Carousel>
      </div>

      {/* 上一页和下一页 */}
      <button className={styles.prev} onClick={() => changePage(-1)}>
        <span></span>
      </button>
      <button className={styles.next} onClick={() => changePage(1)}>
        <span></span>
      </button>
    </div>
  );
});
export default Swiper;
Swiper.displayName = "Swiper"; // 方便以后调试用的
