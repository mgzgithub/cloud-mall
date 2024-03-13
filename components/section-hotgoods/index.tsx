import { memo, ReactElement } from "react";
import type { FC } from "react";
import SectionTitle from "../section-title";
import GridView from "../grid-view";
import { IProduct } from "@/service/home";
export interface IProps {
  productList?: IProduct[];
  // ...
}
const SectionHotGoods: FC<IProps> = memo(function (props) {
  const { productList } = props;
  return (
    <>
      <SectionTitle title="热门商品"></SectionTitle>
      <GridView products={productList}></GridView>
    </>
  );
});
export default SectionHotGoods;
SectionHotGoods.displayName = "SectionHotGoods"; // 方便以后调试用的
