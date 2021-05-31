import React from "react";

import { ICategory } from "../interfaces";
import categoryStyles from "../styles/Category.module.scss";
import MenuItem from "./MenuItem";

function Category({ title, id, products, note }: ICategory) {
  return (
    <section key={id} className={categoryStyles.category}>
      <h3>{title}</h3>
      <p>{note}</p>
      <div className={categoryStyles.products}>{products.map(MenuItem)}</div>
    </section>
  );
}
export default Category;
