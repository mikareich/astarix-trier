import React, { useEffect, useRef, useState } from "react";

import { Category as CategoryProps } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import Category from "./Category";

interface MenuProps {
  menu: CategoryProps[];
}

function Menu({ menu }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryProps>();
  const [scrollPosition, setScrollPosition] = useState<number>();

  const updateScrollPosition = () =>
    typeof window === "object" && setScrollPosition(window.scrollY + 180);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);
  }, []);

  return (
    <div className={menuStyles.menu}>
      <div className={menuStyles.categories}>
        {menu.map((category) => {
          const categoryRef = useRef<HTMLDivElement>();
          const y1 = categoryRef?.current?.offsetTop;
          const y2 = y1 + categoryRef?.current?.offsetHeight;

          useEffect(() => {
            if (scrollPosition >= y1 && scrollPosition <= y2) {
              setActiveCategory(category);
            }
          }, [scrollPosition]);

          return (
            <div ref={categoryRef} key={category.id}>
              <Category {...category} />
            </div>
          );
        })}
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
