import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React from "react";

import { ContentRenderer, Layout, StateUpdater } from "../components";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMetadata, getPage } from "../utils/contentful";

function Index({
  content,
  title,
  metaDescription,
  favIcon,
  ...restProps
}: PageProps) {
  return (
    <>
      <Layout
        pageTitle={`Astarix Trier | ${title}`}
        metaDescription={metaDescription}
        favIcon={favIcon}
      >
        <main className={layoutStyles.main}>
          <ContentRenderer content={content} />
        </main>
        <StateUpdater
          {...{ content, title, metaDescription, favIcon, ...restProps }}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  const pageProps = await getPage(
    { id: "7qFU0oIrQlFr5R2tORmyFQ" },
    ctx.preview
  );
  const metadata = await getMetadata();

  return {
    props: {
      ...pageProps,
      ...metadata,
      preview: ctx.preview || false,
    },
  };
}

export default Index;
