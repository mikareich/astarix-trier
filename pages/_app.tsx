import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import { AppBar, Drawer, HeroImage, Layout, Logo } from "../components";
import { Page, Route } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  footbarRoutesState,
  heroState,
  navbarRoutesState,
  previewState,
  titleState,
} from "../utils/atoms";

export interface AppProps {
  Component: React.ComponentClass;
  pageProps: Page;
}

function App({ Component, pageProps }: AppProps) {
  const heroImage = useRecoilValue(heroState);
  const preview = useRecoilValue(previewState);

  // format routes

  const leadingRouteAsImage = (route: Route, navbar: boolean): Route => ({
    ...route,
    title:
      (route.leading &&
        (navbar ? (
          <Logo.Astarix color="red" />
        ) : (
          <Logo.Astarix color="gray" />
        ))) ||
      route.title,
  });

  const isNotLeadingFromFootbar = (route: Route) => !route.leading;

  const navbarRoutes = useRecoilValue(navbarRoutesState).map((route) =>
    leadingRouteAsImage(route, true)
  );
  const footbarRoutes = useRecoilValue(footbarRoutesState).map((route) =>
    leadingRouteAsImage(route, false)
  );
  const drawerRoutes = [...navbarRoutes, ...footbarRoutes].filter(
    isNotLeadingFromFootbar
  );

  return (
    <>
      <Drawer routes={drawerRoutes} />
      <div className={layoutStyles.layout}>
        <header className={layoutStyles.navBar}>
          <AppBar routes={navbarRoutes} position="top" />
        </header>
        <HeroImage src={heroImage.url} description={heroImage.description} />
        <Component {...pageProps} />
        <footer className={layoutStyles.footer}>
          <AppBar routes={footbarRoutes} position="bottom" />
        </footer>
        {preview && (
          <a href="/api/clear-preview">
            You are in preview-mode. Click to exit preview
          </a>
        )}
      </div>
    </>
  );
}

function AppContainer({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ParallaxProvider scrollAxis="vertical">
        <App Component={Component} pageProps={pageProps} />
      </ParallaxProvider>
    </RecoilRoot>
  );
}

export default AppContainer;
