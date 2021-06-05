import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { IPage, IRoute } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  drawerState,
  favIconState,
  footbarRoutesState,
  heroState,
  navbarRoutesState,
  titleState,
} from "../utils/atoms";

export interface IAppProps {
  Component: React.ComponentClass;
  pageProps: IPage;
}

function App({ Component, pageProps }: IAppProps) {
  const heroImage = useRecoilValue(heroState);
  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const showDrawer = useRecoilValue(drawerState);
  const favIcon = useRecoilValue(favIconState);

  // format routes

  const leadingRouteAsImage = (route: IRoute, navbar): IRoute => ({
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

  const isNotLeadingFromFootbar = (route: IRoute) =>
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
      <Drawer routes={drawerRoutes} show={showDrawer} />
      <div className={layoutStyles.layout}>
        <header className={layoutStyles.navBar}>
          <AppBar routes={navbarRoutes} position="top" />
        </header>
        <HeroImage src={heroImage.url} description={heroImage.description} />
        <Component {...pageProps} />
        <footer className={layoutStyles.footer}>
          <AppBar routes={footbarRoutes} position="bottom" />
        </footer>
      </div>
    </Layout>
  );
}

function AppContainer({ Component, pageProps }: IAppProps) {
  return (
    <RecoilRoot>
      <ParallaxProvider scrollAxis="vertical">
        <App Component={Component} pageProps={pageProps} />
      </ParallaxProvider>
    </RecoilRoot>
  );
}

export default AppContainer;
