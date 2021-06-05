import React from "react";

import { ICategory } from "../interfaces";
import Category from "./Category";

interface IMenuProps {
  menu: ICategory[];
}

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
