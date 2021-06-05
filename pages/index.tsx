import {
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IMenuProps, IMetadata, IPage } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import {
  descriptionState,
  favIconState,
  heroState,
  titleState,
} from "../utils/atoms";
import { getMenu, getMetadata, getPage } from "../utils/contentful";

function Index({
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

export async function getStaticProps(): Promise<
  GetStaticPropsResult<IPage & IMetadata>
> {
  const pageProps = await getPage("home");
  const metadata = await getMetadata();

  return {
    props: { ...pageProps, ...metadata },
  };
}

export default Index;
