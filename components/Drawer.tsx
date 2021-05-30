import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

import { DrawerProps } from "../interfaces";
import drawerStyles from "../styles/Drawer.module.scss";
import { drawerState } from "../utils/atoms";

const Drawer: React.FC<DrawerProps> = ({ routes }) => {
  const router = useRouter();

  const [showDrawer, setDrawer] = useRecoilState(drawerState);

  const closeDrawer = () => setDrawer(false);

  const variants = {
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
      className={drawerStyles.drawerContainer}
    >
      <div className={drawerStyles.drawer}>
        {routes.map(({ title, pathname }) => {
          const isActive = router.pathname === pathname;
          const className = `
          ${drawerStyles.link} 
          ${isActive ? "active" : "inactive"}
          `;

          return (
            <Link href={pathname} passHref key={pathname}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className={className} onClick={closeDrawer}>
                {title}
              </a>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default Drawer;
