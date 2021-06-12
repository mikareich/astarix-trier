import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React from "react";

import BlockRenderer from "../components/ContentRenderer";
import StateUpdater from "../components/StateUpdater";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMetadata, getPage } from "../utils/contentful";

function Index({ content, ...restProps }: PageProps) {
  return (
    <>
      <main className={layoutStyles.main}>
        <BlockRenderer content={content} />
      </main>
      <StateUpdater {...{ content, ...restProps }} />
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  const pageProps = await getPage("", ctx.preview);
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
