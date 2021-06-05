import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React, { useEffect } from "react";

import { PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMetadata, getPage } from "../utils/contentful";
import { updateAppContext } from "../utils/recoil";

function Index(props: PageProps) {
  useEffect(() => updateAppContext(props), []);

  return (
    <>
      {props.preview && (
        <a href="/api/clear-preview">
          You are in preview-mode. Click to exit preview
        </a>
      )}
      <main
        className={layoutStyles.main}
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
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
