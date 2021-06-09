import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";

import Menu from "../components/Menu";
import StateUpdater from "../components/StateUpdater";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  getAllPageRoutes,
  getMenu,
  getMetadata,
  getPageBySlug,
} from "../utils/contentful";

function Page({ content, menu, id, ...restProps }: PageProps) {
  return (
    <>
      <main className={layoutStyles.main}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {/* Speisekarte-ID */}
        {id === "5pi929rdlMYzouwXnB63Su" && <Menu menu={menu} />}
      </main>
      <StateUpdater {...{ content, menu, id, ...restProps }} />
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

  const pageProps = await getPageBySlug(slug, ctx.preview);
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
