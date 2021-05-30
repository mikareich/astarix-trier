import React from "react";

import { MenuProps } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import MenuItem from "./MenuItem";

function Menu({ menu }: MenuProps) {
  return (
    <>
      {menu.map((category) => (
        <section key={category.id}>
          <h3>{category.title}</h3>
          <p>{category.note}</p>
          <div className={menuStyles.MenuItemList}>
            {category.products.map(MenuItem)}
          </div>
          <br />
          <hr />
          <br />
        </section>
      ))}
    </>
  );
}

export default Menu;
