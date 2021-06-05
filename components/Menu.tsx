import React from "react";

import { IMenuProps } from "../interfaces";
import Category from "./Category";

function Menu({ menu }: IMenuProps) {
  return (
    <div>
      <b>Übersicht</b>
      <ol>
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
