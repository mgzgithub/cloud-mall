import { memo, ReactElement } from "react";
import type { FC } from "react";
import SectionTitle from "../section-title";
import GridView from "../grid-view";
import { IHotProduct } from "@/service/home";
export interface IProps {
  hotProduct?: IHotProduct[];
  // ...
}
const SectionRecomment: FC<IProps> = memo(function (props) {
  const { hotProduct } = props;
  return (
    <>
      <SectionTitle title="编辑推荐"></SectionTitle>
      <GridView products={hotProduct}></GridView>
    </>
  );
});
export default SectionRecomment;
SectionRecomment.displayName = "SectionRecomment"; // 方便以后调试用的
