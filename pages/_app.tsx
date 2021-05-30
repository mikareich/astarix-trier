import "../styles/globals.scss";

import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { RecoilRoot, useRecoilValue } from "recoil";

import AppBar from "../components/AppBar";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import { AppProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { descriptionState, heroState, titleState } from "../utils/atoms";
import { footerRoutes, navBarRoutes } from "../utils/routes";

function PopulatedLayout({ Component, pageProps }: AppProps) {
  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const heroImage = useRecoilValue(heroState);

  return (
    <Layout pageTitle={title} metaDescription={description}>
      <div className={layoutStyles.layout}>
        <header className={layoutStyles.navBar}>
          <AppBar routes={navBarRoutes} drawer fixed />
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
          <hr />
          <AppBar routes={footerRoutes} />
        </footer>
      </div>
    </Layout>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ParallaxProvider scrollAxis="vertical">
        <PopulatedLayout Component={Component} pageProps={pageProps} />
      </ParallaxProvider>
    </RecoilRoot>
  );
}

export default App;
