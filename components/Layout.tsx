import Head from "next/head";
import React from "react";

import { IImage } from "../interfaces";

export interface ILayoutProps {
  pageTitle: string;
  metaDescription: string;
  favIcon: IImage;
  children: React.ReactNode;
}

function Layout({
  pageTitle,
  metaDescription,
  favIcon,
  children,
}: ILayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="shortcut icon" href={favIcon.url} type="image/x-icon" />
      </Head>
      {children}
    </>
  );
}

export default Layout;
