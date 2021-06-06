import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
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
  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const favIcon = useRecoilValue(favIconState);
  const preview = useRecoilValue(previewState);

  // format routes

  const leadingRouteAsImage = (route: Route, navbar): Route => ({
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

  const isNotLeadingFromFootbar = (route: Route) =>
    !(route.leading && footbarRoutes.includes(route));

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
    <Layout pageTitle={title} metaDescription={description} favIcon={favIcon}>
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
    </Layout>
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
