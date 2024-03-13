import { memo } from "react";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import type { FC } from "react";
import type { IHotProduct, IProduct } from "@/service/home";
import GridViewItem from "../grid-view-item";
export interface IProps {
  products?: IHotProduct[] | IProduct[];
}
const GridView: FC<IProps> = memo(function (props) {
  const { products = [] } = props;
  return (
    <div className={styles["grid-view"]}>
      <Row>
        {products.map((product, index) => {
          return (
            <Col key={product.id} span={6}>
              <div className={styles["view-item"]}>
                <GridViewItem product={product} showTip={false}></GridViewItem>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
});
export default GridView;
GridView.displayName = "GridView"; // 方便以后调试用的
