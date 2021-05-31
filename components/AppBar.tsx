import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdMenu } from "react-icons/md";
import { useRecoilState } from "recoil";

import { IAppBarProps } from "../interfaces";
import appBarStyles from "../styles/AppBar.module.scss";
import { drawerState } from "../utils/atoms";
import { drawerRoutes } from "../utils/routes";
import Drawer from "./Drawer";

const AppBar: React.FC<IAppBarProps> = ({ routes, position }) => {
  const router = useRouter();

  const [showDrawer, setDrawer] = useRecoilState(drawerState);

  const toggleDrawer = () => setDrawer(!showDrawer);

  return (
    <>
      {position === "top" && <div className={appBarStyles.layer} />}
      <nav
        className={`
                      ${appBarStyles.appBar}
                      ${
                        position === "top"
                          ? appBarStyles.top
                          : appBarStyles.bottom
                      }
                      `}
      >
        {routes.map(({ title, pathname, leading }) => {
          const isActive = router.pathname === pathname;
          const className = `
            ${appBarStyles.link} 
            ${leading ? appBarStyles.leading : "inactive"}
            ${isActive ? "active" : ""}
          `;

          return (
            <Link href={pathname} passHref key={pathname}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className={className}>
                {title}
              </a>
            </Link>
          );
        })}
        <button
          type="button"
          className={appBarStyles.iconButton}
          aria-label="Öffne Drawer"
        >
          <MdMenu size={24} onClick={toggleDrawer} />
        </button>
      </nav>
    </>
  );
};

export default AppBar;
