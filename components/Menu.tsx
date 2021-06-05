import React from "react";

import { IMenuProps } from "../interfaces";
import Category from "./Category";

function Menu({ menu }: IMenuProps) {
  return <div>{menu.map(Category)}</div>;
}

export default Menu;
