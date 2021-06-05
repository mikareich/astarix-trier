import Head from "next/head";
import React from "react";

import { Image } from "../interfaces";

interface LayoutProps {
  pageTitle: string;
  metaDescription: string;
  favIcon: Image;
  children: React.ReactNode;
}

function Layout({
  pageTitle,
  metaDescription,
  favIcon,
  children,
}: LayoutProps) {
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
