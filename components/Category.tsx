import React from "react";

import { ICategory } from "../interfaces";
import categoryStyles from "../styles/Category.module.scss";
import MenuItem from "./MenuItem";

function Category({ title, products, note, id }: ICategory) {
  return (
    <section className={categoryStyles.category} id={id}>
      <h3>{title}</h3>
      <p>{note}</p>
      <div className={categoryStyles.products}>{products.map(MenuItem)}</div>
    </section>
  );
}
export default Category;
