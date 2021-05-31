import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getPageProps } from "../utils/api";
import { descriptionState, heroState, titleState } from "../utils/atoms";

function Datenschutzerklaerung({
  title,
  heroImage,
  content,
  description,
}: IPageProps) {
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
  const id = "60b391002544e00008dca204";

  const props = await getPageProps(id);

  return {
    props,
  };
}

export default Datenschutzerklaerung;
