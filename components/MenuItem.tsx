import React from "react";

import { Product } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import Logo from "./Logo";

function MenuItem({ title, price, variants, description, vegan, id }: Product) {
  return (
    <div key={id} className={menuStyles.MenuItem}>
      <span className={menuStyles.title}>{title}</span>
      {description && (
        <span className={menuStyles.description}>{description}</span>
      )}
      {vegan && (
        <div className={menuStyles.vegan}>
          <Logo.Vegan size={12} />
        </div>
      )}

      {price > 0 && (
        <>
          <div className={menuStyles.space} />
          <span className={menuStyles.price}>{price.toFixed(2)}€</span>
        </>
      )}
      {variants.length > 0 && (
        <ul className={menuStyles.variants}>
          {variants.map(({ variant }) => (
            <li key={variant}>{variant}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuItem;