import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React, { useEffect } from "react";

import StateUpdater from "../components/StateUpdater";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMetadata, getPageBySlug } from "../utils/contentful";

function Index({ content, ...restProps }: PageProps) {
  return (
    <>
      <main
        className={layoutStyles.main}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <StateUpdater {...{ content, ...restProps }} />
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  const pageProps = await getPageBySlug("", ctx.preview);
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
