import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React from "react";

import {
  ContentRenderer,
  HeroImage,
  Layout,
  Menu,
  StateUpdater,
} from "../components";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  getAllPageRoutes,
  getMenu,
  getMetadata,
  getPage,
} from "../utils/contentful";

function Page({
  content,
  menu,
  id,
  title,
  metaDescription,
  favIcon,
  heroImage,
  navbarRoutes,
  footbarRoutes,
  preview,
}: PageProps) {
  return (
    <>
      <Layout
        pageTitle={`Astarix Trier | ${title}`}
        metaDescription={metaDescription}
        favIcon={favIcon}
      >
        <HeroImage src={heroImage.url} description={heroImage.description} />
        <main className={layoutStyles.main}>
          <ContentRenderer content={content} />
          {/* Speisekarte-ID */}
          {id === "5pi929rdlMYzouwXnB63Su" && <Menu menu={menu} />}
        </main>
        <StateUpdater {...{ navbarRoutes, footbarRoutes, preview }} />
      </Layout>
    </>
  );
}

interface PathParams {
  [slug: string]: string;
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PathParams>
> {
  const routes = await getAllPageRoutes();

  const staticPaths = routes
    .map(
      // skip home-page with id 7qFU0oIrQlFr5R2tORmyFQ
      ({ id, slug }) => id !== "7qFU0oIrQlFr5R2tORmyFQ" && { params: { slug } }
    )
    .filter((n) => n);

  return {
    paths: staticPaths,
    fallback: false,
  };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<PathParams>
): Promise<GetStaticPropsResult<PageProps>> {
  const { slug } = ctx.params;

  const pageProps = await getPage({ slug }, ctx.preview);
  const metadata = await getMetadata();
  const menu = await getMenu();

  return {
    props: {
      ...pageProps,
      ...metadata,
      menu,
      preview: ctx.preview || false,
    },
  };
}

export default Page;
