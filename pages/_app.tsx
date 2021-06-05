import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import { IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  drawerState,
  favIconState,
  heroState,
  titleState,
} from "../utils/atoms";
import { drawerRoutes, footerRoutes, navBarRoutes } from "../utils/routes";

export interface IAppProps {
  Component: React.ComponentClass;
  pageProps: IPageProps;
}

function App({ Component, pageProps }: IAppProps) {
  const heroImage = useRecoilValue(heroState);
  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const showDrawer = useRecoilValue(drawerState);
  const favIcon = useRecoilValue(favIconState);

  return (
    <Layout pageTitle={title} metaDescription={description} favIcon={favIcon}>
      <Drawer routes={drawerRoutes} show={showDrawer} />
      <div className={layoutStyles.layout}>
        <header className={layoutStyles.navBar}>
          <AppBar routes={navBarRoutes} position="top" />
        </header>
        <HeroImage src={heroImage.url} description={heroImage.description} />
        <Component {...pageProps} />
        <footer className={layoutStyles.footer}>
          <AppBar routes={footerRoutes} position="bottom" />
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
