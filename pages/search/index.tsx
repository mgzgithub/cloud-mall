import { memo } from "react";
import type { FC } from "react";
import { GetServerSideProps } from "next";
import wrapper from "@/store/index";
import { getProductSearchData } from "@/service/search";
import { IProduct } from "@/service/home";
import GridView from "@/components/grid-view";
import classNames from "classnames";
import { fatchNavbarSuggestData } from "@/store/modules/home";
export interface IProps {
  products?: IProduct[];
}
const Search: FC<IProps> = memo(function (props) {
  const { products } = props;
  return (
    <div className="search">
      <div className={classNames("wrapper")}>
        <GridView products={products}></GridView>
      </div>
    </div>
  );
});

export default Search;
Search.displayName = "Search";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async context => {
      await store.dispatch(fatchNavbarSuggestData());
      const { q } = context.query;
      const res = await getProductSearchData({
        limit: 60,
        offset: 0,
        q: q as string,
      });
      return {
        props: {
          products: res.products || [],
        },
      };
    };
  });
