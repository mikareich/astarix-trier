import React from "react";

import { Category as CategoryProps } from "../interfaces";
import Category from "./Category";

interface MenuProps {
  menu: CategoryProps[];
}

function Menu({ menu }: MenuProps) {
  return (
    <div>
      <b>Übersicht</b>
      <ol>
        {menu.map((category) => (
          <li key={category.id}>
            <a href={`#${category.title}`}>{category.title}</a>
          </li>
        ))}
      </ol>
      {menu.map((category) => (
        <Category key={category.id} {...category} />
      ))}
    </div>
  );
}

export default Menu;
