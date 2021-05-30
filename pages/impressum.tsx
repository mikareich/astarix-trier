import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { Description, PageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getPageProps } from "../utils/api";
import { descriptionState, heroState, titleState } from "../utils/atoms";

function Impressum({
  title,
  heroImage,
  content,
  description,
}: PageProps & Description) {
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

export async function getStaticProps() {
  const id = "60b390cab11c22000757f6b8";

  const props = await getPageProps(id);

  return {
    props,
  };
}

export default Impressum;
