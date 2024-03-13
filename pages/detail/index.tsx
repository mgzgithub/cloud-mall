import { getDetailPageInfo, IDetailPageInfo } from "@/service/detail";
import wrapperStore from "@/store";
import styles from "./index.module.scss";
import { fatchNavbarSuggestData } from "@/store/modules/home";
import { GetServerSideProps } from "next";
import { memo, ReactElement } from "react";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import GridView from "@/components/grid-view";
import classNames from "classnames";

export interface IProps {
  detailData?: IDetailPageInfo;
}
const Detail: FC<IProps> = memo(function (props) {
  const { detailData } = props;
  return (
    <div className={styles.detail}>
      <div className={classNames("wrapper", styles.content)}>
        {/* 图片 */}
        <div className={styles.banner}>
          <Image
            className={styles.image}
            src={detailData?.webPic!}
            alt="air"
            fill
          ></Image>
        </div>
        {/* 商品列表 */}
        <GridView products={detailData?.products}></GridView>
      </div>
    </div>
  );
});

export default Detail;
Detail.displayName = "Detail";

// 在服务端中发送网络请求 并把结果以props的形式传参给组件
export const getServerSideProps: GetServerSideProps =
  wrapperStore.getServerSideProps(store => {
    return async context => {
      await store.dispatch(fatchNavbarSuggestData());

      const { id } = context.query;
      const res = await getDetailPageInfo(id as string);

      return {
        props: {
          detailData: res.data,
        },
      };
    };
  });
