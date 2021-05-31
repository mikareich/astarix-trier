import Head from "next/head";
import React from "react";

import { ILayoutProps } from "../interfaces";

function Layout({ pageTitle, metaDescription, children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      {children}
    </>
  );
}

export default Layout;
