import React, {Fragment} from "react";

import Header from "../../layout/Header";
import Bread from "../productdetail/Bread";
import ProductNewDetail from "./ProductNewDetail";
import Footer from "../../layout/Footer";

// update
// `/catalog-service/catalogs/{productId}`

export default function ProductNew() {
  return (
    <Fragment>
      <Header />
      <Bread productName = "상품등록" />
      <ProductNewDetail />
      <Footer />
    </Fragment>
  );
}