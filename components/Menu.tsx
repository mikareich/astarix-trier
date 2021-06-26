import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Category as CategoryProps } from "../interfaces";
import menuStyles from "../styles/Menu.module.scss";
import Category from "./Category";
import Link from "./Link";

interface MenuProps {
  menu: CategoryProps[];
}

function Menu({ menu }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryProps>();
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [showToc, setShowToc] = useState(true);

  const updateScrollPosition = () =>
    typeof window === "object" && setScrollPosition(window.scrollY + 180);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);
  }, []);

  const animationVariants: Variants = {
    show: {
      height: "100%",
    },
    hidden: {
      height: "0px",
    },
  };

  const toggleToc = () => setShowToc(!showToc);

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
        <header className={menuStyles.tocHeader}>
          <h3>Übersicht</h3>
          <button
            type="button"
            className="iconButton"
            onClick={toggleToc}
            aria-label="Öffne/ Schließe Menu-Übersicht"
          >
            {showToc ? (
              <MdKeyboardArrowUp size={24} />
            ) : (
              <MdKeyboardArrowDown size={24} />
            )}
          </button>
        </header>
        <motion.ol
          variants={animationVariants}
          animate={showToc ? "show" : "hidden"}
          initial="show"
          transition={{ duration: 0.2 }}
          className={menuStyles.tocList}
        >
          {menu.map((category) => {
            const isActive = category.id === activeCategory?.id;

            return (
              <li key={category.id} className={menuStyles.tocItem}>
                <Link
                  href={`#${category.title}`}
                  onClick={() => setActiveCategory(category)}
                  active={isActive}
                >
                  {category.title}
                </Link>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </div>
  );
}

export default Menu;
