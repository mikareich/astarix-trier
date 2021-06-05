import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Menu from "../components/Menu";
import { IPage, IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  footbarRoutesState,
  heroState,
  navbarRoutesState,
  titleState,
} from "../utils/atoms";
import {
  client,
  getAllPageRoutes,
  getMenu,
  getMetadata,
  getPage,
} from "../utils/contentful";

function Page({
  title,
  heroImage,
  content,
  metaDescription,
  slug,
  favIcon,
  menu,
  preview,
  navbarRoutes,
  footbarRoutes,
}: IPageProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setFavIcon] = useRecoilState(favIconState);
  const [, setHeroImage] = useRecoilState(heroState);
  const [, setNavbarRoutes] = useRecoilState(navbarRoutesState);
  const [, setFootbarRoutes] = useRecoilState(footbarRoutesState);

  useEffect(() => {
    setTitle(`Astarix Trier | ${title}`);
    setDescription(metaDescription);
    setFavIcon(favIcon);
    setHeroImage(heroImage);
    setNavbarRoutes(navbarRoutes);
    setFootbarRoutes(footbarRoutes);
  }, []);

  return (
    <>
      {preview && (
        <a href="/api/clear-preview">
          You are in preview-mode. Click to exit preview
        </a>
      )}
      <main className={layoutStyles.main}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {slug === "speisekarte" && <Menu menu={menu} />}
      </main>
    </>
  );
}

type PathParams = { slug: string };

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PathParams>
> {
  const routes = await getAllPageRoutes();

  const staticPaths = routes
    .map(({ slug }) => slug !== "" && { params: { slug } })
    .filter((n) => n);

  return {
    paths: staticPaths,
    fallback: false,
  };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<PathParams>
): Promise<GetStaticPropsResult<IPageProps>> {
  const { slug } = ctx.params;

  const pageProps = await getPage(slug, ctx.preview);
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
