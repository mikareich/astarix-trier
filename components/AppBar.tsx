import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { useRecoilState } from "recoil";

import { Route } from "../interfaces";
import appBarStyles from "../styles/AppBar.module.scss";
import { drawerState } from "../utils/atoms";

interface AppProps {
  routes: Route[];
  position: "top" | "bottom";
}

const AppBar: React.FC<AppProps> = ({ routes, position }) => {
  const router = useRouter();

  const [showDrawer, setDrawer] = useRecoilState(drawerState);

  const toggleDrawer = () => setDrawer(!showDrawer);

  return (
    <>
      {position === "top" && <div className={appBarStyles.layer} />}
      <nav
        className={`${appBarStyles.appBar}
                    ${
                      position === "top"
                        ? appBarStyles.top
                        : appBarStyles.bottom
                    }`}
      >
        {routes.map(({ title, slug, leading }) => {
          const isActive = (router.query.slug || router.route) === slug;
          const className = `
            ${appBarStyles.link} 
            ${leading ? appBarStyles.leading : "inactive"}
            ${isActive ? "active" : ""}
          `;

          return (
            <Link href={`/${slug}`} passHref key={slug}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="#"
                className={className}
                onClick={() => setDrawer(false)}
              >
                {title}
              </a>
            </Link>
          );
        })}
        <button
          type="button"
          className={appBarStyles.iconButton}
          aria-label="Öffne Drawer/ Schließe Drawer"
        >
          {showDrawer ? (
            <MdClose size={24} onClick={toggleDrawer} />
          ) : (
            <MdMenu size={24} onClick={toggleDrawer} />
          )}
        </button>
      </nav>
    </>
  );
};

export default AppBar;
