import React from "react";

export interface IRoute {
  title: string | React.ReactChild;
  slug: string;
  id: string;
  leading?: boolean;
}

export interface IAppBarProps {
  routes: IRoute[];
  position: "top" | "bottom";
}

export interface IDrawerProps {
  routes: IRoute[];
  show?: boolean;
}

export interface ILayoutProps {
  pageTitle: string;
  metaDescription?: string;
  children: React.ReactNode;
}

export interface ICosmicImage {
  url: string;
  imgix_url: string;
}

export interface IDescription {
  description: string;
}

export interface IPageProps {
  title: string;
  heroImage: ICosmicImage;
  content: string;
  description: string;
}

export interface IAppProps {
  Component: React.ComponentClass;
  pageProps: IPageProps;
}

export interface IHeroImageProps {
  src: string;
  alt: string;
}

export interface IProduct {
  title: string;
  vegan: boolean;
  description: string;
  variants: Array<{ variant: string }>;
  price: number;
  id: string;
}

export interface ICategory {
  title: string;
  note: string;
  products: IProduct[];
  id: string;
}

export interface IMenuProps {
  menu: ICategory[];
}

export interface VeganProps {
  size?: number;
}

export interface AstarixLogoProps {
  color: "red" | "gray" | "black";
  size?: number;
}
