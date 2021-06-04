import React from "react";

export interface IRoute {
  title: string | React.ReactChild;
  slug: string;
  leading?: boolean;
}

export interface IImage {
  url: string;
  description: string;
}

export interface IDescription {
  description: string;
}

export interface IPage {
  slug: string;
  title: string;
  heroImage: IImage;
  content: string;
  id: string;
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

export interface IMetadata {
  favIcon: IImage;
  metaDescription: string;
}
