import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Menu from "../components/Menu";
import { MenuProps, PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getMenu, getPageProps } from "../utils/api";
import { heroState, titleState } from "../utils/atoms";

function Karte({ title, heroImage, content, menu }: PageProps & MenuProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setHeroImage] = useRecoilState(heroState);

  useEffect(() => {
    setTitle(title);
    setHeroImage(heroImage);
  }, []);

  return (
    <main className={layoutStyles.main}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Menu menu={menu} />
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
