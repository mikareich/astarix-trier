import {
  GetServerSidePropsResult,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Menu from "../components/Menu";
import { IMenuProps, IMetadata, IPage } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  heroState,
  titleState,
} from "../utils/atoms";
import { client, getMenu, getMetadata, getPage } from "../utils/contentful";

function Page({
  title,
  heroImage,
  content,
  metaDescription,
  slug,
  favIcon,
  menu,
}: IPage & IMetadata & IMenuProps) {
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
    <main className={layoutStyles.main}>
      {" "}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {slug === "speisekarte" && <Menu menu={menu} />}
    </main>
  );
}

type PathParams = { slug: string };

export async function getStaticPaths(
  ctx: GetStaticPathsContext
): Promise<GetStaticPathsResult<PathParams>> {
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
): Promise<GetStaticPropsResult<IPage & IMetadata & IMenuProps>> {
  const { slug } = ctx.params;

  const pageProps = await getPage(slug, ctx.preview);
  const metadata = await getMetadata();
  const menu = await getMenu();

  return {
    props: { ...pageProps, ...metadata, menu },
  };
}

export default Page;
