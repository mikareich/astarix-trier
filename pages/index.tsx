import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React, { useEffect } from "react";

import StateUpdater from "../components/StateUpdater";
import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMetadata, getPage } from "../utils/contentful";

function Index({ preview, content, ...restProps }: PageProps) {
  return (
    <>
      {preview && (
        <a href="/api/clear-preview">
          You are in preview-mode. Click to exit preview
        </a>
      )}
      <main
        className={layoutStyles.main}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <StateUpdater {...{ preview, content, ...restProps }} />
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  const pageProps = await getPage("home", ctx.preview);
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
