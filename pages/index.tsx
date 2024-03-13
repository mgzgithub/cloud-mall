import { GetServerSideProps } from "next";
import wrapperStore from "@/store";
import { fatchNavbarSuggestData } from "@/store/modules/home";
import { getAllProduct, getHomeInfo, getHotproduct_v2 } from "@/service/home";
import type { IHomeInfo, IHotProduct, IProduct } from "@/service/home";
import Swiper from "@/components/swiper";
import { memo, ReactElement } from "react";
import type { FC } from "react";
import Category from "@/components/category";
import Recommend from "@/components/recommend";
import classNames from "classnames";
import SectionRecomment from "@/components/section-recommend";
import SectionHotGoods from "@/components/section-hotgoods";
import DigitalPanel from "@/components/digital-panel";

export interface IProps extends IHomeInfo {
  hotGoodsList: IHotProduct[];
  allGoodsList: IProduct[];
}
const Home: FC<IProps> = memo(function (props) {
  const {
    banners,
    categorys,
    digitalData,
    recommends,
    hotGoodsList,
    allGoodsList,
  } = props;
  return (
    <main style={{ overflow: "hidden" }}>
      <Swiper banners={banners} />
      <Category categorys={categorys} />
      <Recommend recommends={recommends} />
      {/* 中间的内容->版心 */}
      <div className={classNames("wrapper")}>
        <SectionRecomment hotProduct={hotGoodsList} />
        <DigitalPanel itemData={digitalData}></DigitalPanel>
        <SectionHotGoods productList={allGoodsList} />
      </div>
    </main>
  );
});
export default Home;
Home.displayName = "Home"; // 方便以后调试用的

export const getServerSideProps: GetServerSideProps =
  wrapperStore.getServerSideProps(store => {
    return async context => {
      await store.dispatch(fatchNavbarSuggestData());

      const homeData = await getHomeInfo();
      const hotGoodsData = await getHotproduct_v2();
      const allGoodsData = await getAllProduct();
      return {
        props: {
          banners: homeData.data.banners || [],
          categorys: homeData.data.categorys || [],
          digitalData: homeData.data.digitalData || [],
          recommends: homeData.data.recommends || [],
          hotGoodsList: hotGoodsData.data.hotProduct || [],
          allGoodsList: allGoodsData.data.allProduct || [],
        },
      };
    };
  });
