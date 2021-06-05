import React from "react";

export interface Route {
  id: string;
  title: string | React.ReactChild;
  slug: string;
  leading?: boolean;
}

export interface Image {
  url: string;
  description: string;
}

export interface Page {
  slug: string;
  title: string;
  heroImage: Image;
  content: string;
  id: string;
}

export interface Metadata {
  favIcon: Image;
  metaDescription: string;
  navbarRoutes: Route[];
  footbarRoutes: Route[];
}

export interface PageProps extends Page, Metadata {
  preview: boolean;
  menu?: Category[];
}

export interface Product {
  title: string;
  vegan: boolean;
  description: string;
  variants: { variant: string; price: string | undefined; id: string }[];
  price: number;
  id: string;
}

export interface Category {
  title: string;
  note: string;
  products: Product[];
  id: string;
}
