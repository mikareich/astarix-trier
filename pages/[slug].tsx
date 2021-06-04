import {
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IPage } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { descriptionState, heroState, titleState } from "../utils/atoms";
import { client, getPage } from "../utils/contentful";

function Index({ title, heroImage, content, description }) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setHeroImage] = useRecoilState(heroState);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
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
): Promise<GetStaticPropsResult<IPage>> {
  const { slug } = ctx.params;

  const props = await getPage(slug);

  return {
    props,
  };
}

export default Index;
