import React from "react";

import { Product as ProductProps } from "../interfaces";
import productStyles from "../styles/Product.module.scss";
import Logo from "./Logo";

function Product({
  title,
  price,
  variants,
  description,
  vegan,
  id,
}: ProductProps) {
  return (
    <div key={id} className={productStyles.product}>
      <span className={productStyles.title}>{title}</span>
      {description && (
        <div
          className={productStyles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {vegan && (
        <div className={productStyles.vegan}>
          <Logo.Vegan size={12} />
        </div>
      )}

      {price > 0 && (
        <>
          <div className={productStyles.space} />
          <span className={productStyles.price}>{price.toFixed(2)}€</span>
        </>
      )}
      {variants.length > 0 && (
        <ul className={productStyles.variants}>
          {variants.map((variant) => (
            <li key={variant.id} className={productStyles.variant}>
              <span className={productStyles.variantName}>
                {variant.variant}
              </span>
              <span className={productStyles.variantPrice}>
                {variant.price}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Product;
