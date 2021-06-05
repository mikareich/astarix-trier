import React from "react";

import { ICategory } from "../interfaces";
import categoryStyles from "../styles/Category.module.scss";
import Product from "./Product";

function Category({ title, products, note, id }: ICategory) {
  return (
    <section className={categoryStyles.category} id={id}>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: note }} />
      <div className={categoryStyles.products}>{products.map(Product)}</div>
    </section>
  );
}
export default Category;
