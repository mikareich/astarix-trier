import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Category from "../components/Category";
import { IMenuProps, IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMenu, getPageProps } from "../utils/api";
import { descriptionState, heroState, titleState } from "../utils/atoms";

const DynamicCategory = dynamic(() => import("../components/Category"));

function Karte({
  title,
  heroImage,
  content,
  description,
  menu,
}: IPageProps & IMenuProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setHeroImage] = useRecoilState(heroState);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setHeroImage(heroImage);
  }, []);

  return (
    <main className={layoutStyles.main}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {menu.map((category) => (
        <DynamicCategory {...category} key={category.id} />
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const id = "60b379c1f6a02000084be7b7";

  const pageProps = await getPageProps(id);

  const menu = await getMenu();

  return {
    props: {
      ...pageProps,
      menu,
    },
  };
}

export default Karte;
