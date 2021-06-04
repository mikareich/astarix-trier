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

export async function getStaticProps(): Promise<GetStaticPropsResult<IPage>> {
  const props = await getPage("home");

  return {
    props,
  };
}

export default Index;
