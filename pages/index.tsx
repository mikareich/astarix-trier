import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  heroState,
  titleState,
} from "../utils/atoms";
import { getMetadata, getPage } from "../utils/contentful";

function Index({
  title,
  heroImage,
  content,
  metaDescription,
  favIcon,
  preview,
}: IPageProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setFavIcon] = useRecoilState(favIconState);
  const [, setHeroImage] = useRecoilState(heroState);

  useEffect(() => {
    setTitle(`Astarix Trier | ${title}`);
    setDescription(metaDescription);
    setFavIcon(favIcon);
    setHeroImage(heroImage);
  }, []);

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
    </>
  );
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
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
