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
