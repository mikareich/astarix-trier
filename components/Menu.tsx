import React from "react";

import { IMenuProps } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import Category from "./Category";

function Menu({ menu }: IMenuProps) {
  return (
    <div>
      <h3>Übersicht</h3>
      <ol className={menuStyles.overview}>
        {menu.map((category) => (
          <li>
            <a href={`#${category.title}`}>{category.title}</a>
          </li>
        ))}
      </ol>
      {menu.map(Category)}
    </div>
  );
}

export default Menu;
