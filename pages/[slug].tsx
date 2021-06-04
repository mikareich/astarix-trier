import {
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IMetadata, IPage } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  heroState,
  titleState,
} from "../utils/atoms";
import { client, getMetadata, getPage } from "../utils/contentful";

function Page({
  title,
  heroImage,
  content,
  metaDescription,
  favIcon,
}: IPage & IMetadata) {
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
    <main
      className={layoutStyles.main}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

type PathParams = { slug: string };

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PathParams>
> {
  const contentfulItems = await client.getEntries<IPage>({
    content_type: "page",
    // skip homepage
    "fields.slug[ne]": "home",
  });

  const staticPaths = contentfulItems.items.map((data) => ({
    params: {
      slug: data.fields.slug,
    },
  }));

  return {
    paths: staticPaths,
    fallback: false,
  };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<PathParams>
): Promise<GetStaticPropsResult<IPage & IMetadata>> {
  const { slug } = ctx.params;

  const pageProps = await getPage(slug);
  const metadata = await getMetadata();

  return {
    props: { ...pageProps, ...metadata },
  };
}

export default Page;
