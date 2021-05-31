import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import { IAppProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  drawerState,
  heroState,
  titleState,
} from "../utils/atoms";
import { drawerRoutes, footerRoutes, navBarRoutes } from "../utils/routes";

function App({ Component, pageProps }: IAppProps) {
  const heroImage = useRecoilValue(heroState);
  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const showDrawer = useRecoilValue(drawerState);

  return (
    <Layout pageTitle={title} metaDescription={description}>
      <Drawer routes={drawerRoutes} show={showDrawer} />
      <div className={layoutStyles.layout}>
        <header className={layoutStyles.navBar}>
          <AppBar routes={navBarRoutes} position="top" />
        </header>
        <HeroImage
          src={
            heroImage?.imgix_url ||
            "https://imgix.cosmicjs.com/1ca816a0-b56e-11eb-b5b6-fd115d17c053-image-3.png"
          }
          alt="Bild vom Astarix"
        />
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
