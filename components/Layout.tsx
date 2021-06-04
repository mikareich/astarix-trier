import Head from "next/head";
import React from "react";

export interface ILayoutProps {
  pageTitle: string;
  metaDescription?: string;
  children: React.ReactNode;
}

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
