import { motion, Variants } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";

import { Route } from "../interfaces";
import drawerStyles from "../styles/Drawer.module.scss";
import { drawerState } from "../utils/atoms";
import Link from "./Link";

interface DrawerProps {
  routes: Route[];
}

function Drawer({ routes }: DrawerProps) {
  const [showDrawer, setDrawer] = useRecoilState(drawerState);

  const closeDrawer = () => setDrawer(false);

  const variants: Variants = {
    visible: {
      opacity: 1,
      display: "block",
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.aside
      variants={variants}
      animate={showDrawer ? "visible" : "hidden"}
      initial="hidden"
      className={drawerStyles.drawerContainer}
      transition={{ duration: 0.2 }}
    >
      <div className={drawerStyles.drawer}>
        {routes.map(({ title, slug }) => (
          <Link href={`/${slug}`} key={slug} onClick={closeDrawer}>
            {title}
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}

export default Drawer;
