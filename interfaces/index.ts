import React from "react";

export type Route = {
  title: string | React.ReactChild;
  pathname: string;
  leading?: boolean;
};

export interface AppBarProps {
  routes: Route[];
  drawer?: boolean;
  fixed?: boolean;
}

export interface DrawerProps {
  routes: Route[];
  show?: boolean;
}

export interface LayoutProps {
  pageTitle: string;
  metaDescription?: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Description {
  description: string;
}

export interface PageProps {
  title: string;
  heroImage: CosmicImage;
  content: string;
}

export interface AppProps {
  Component: React.ComponentClass;
  pageProps: PageProps;
}

export interface HeroImageProps {
  src: string;
  alt: string;
}

export interface Product {
  title: string;
  vegan: boolean;
  description: string;
  variants: Array<{ variant: string }>;
  price: number;
  id: string;
}

export interface Category {
  title: string;
  note: string;
  products: Product[];
  id: string;
}

export interface MenuProps {
  menu: Category[];
}

export interface VeganProps {
  size?: number;
}

export interface AstarixLogoProps {
  color: "red" | "gray" | "black";
  size?: number;
}
