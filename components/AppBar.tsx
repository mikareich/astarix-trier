import { useRouter } from "next/router";
import React from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { useRecoilState } from "recoil";

import { Route } from "../interfaces";
import appBarStyles from "../styles/AppBar.module.scss";
import { drawerState } from "../utils/atoms";
import Link from "./Link";

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
          const className = `
            ${appBarStyles.link} 
            ${leading ? appBarStyles.leading : "inactive"}
          `;

          return (
            <Link
              href={`/${slug}`}
              onClick={() => setDrawer(false)}
              className={className}
              key={slug}
            >
              {title}
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
