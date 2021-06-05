import React from "react";

import { Category as CategoryProps } from "../interfaces";
import categoryStyles from "../styles/Category.module.scss";
import Product from "./Product";

function Category({ title, products, note, id }: CategoryProps) {
  return (
    <section className={categoryStyles.category} id={id}>
      <h3 id={title}>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: note }} />
      <div className={categoryStyles.products}>{products.map(Product)}</div>
    </section>
  );
}
export default Category;
