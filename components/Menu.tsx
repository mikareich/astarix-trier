import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Category as CategoryProps } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import Category from "./Category";

interface MenuProps {
  menu: CategoryProps[];
}

function Menu({ menu }: MenuProps) {
  const [updatedValue, updateComponent] = useState<Object>();
  const [activeCategory, setActiveCategory] = useState<CategoryProps>();

  useEffect(() => {
    const categoryTitle = window.location.hash.slice(
      1,
      window.location.hash.length
    );
    const category = menu.find((c) => c.title === categoryTitle);
    setActiveCategory(category);
  }, []);

  return (
    <div className={menuStyles.menu}>
      <div className={menuStyles.categories}>
        {menu.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </div>

      <div className={menuStyles.toc}>
        <h3>Übersicht</h3>
        <ol>
          {menu.map((category) => {
            const isActive = category.id === activeCategory?.id;

            return (
              <li key={category.id} className={menuStyles.tocItem}>
                <a
                  href={`#${category.title}`}
                  className={`${isActive ? "" : "inactive"}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Menu;
