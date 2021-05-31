import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { IDescription, IPageProps } from "../interfaces";
import layoutStyles from "../styles/Layout.module.scss";
import { getPageProps } from "../utils/api";
import { descriptionState, heroState, titleState } from "../utils/atoms";

function KommZuUns({
  title,
  heroImage,
  content,
  description,
}: IPageProps & IDescription) {
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
  const id = "60b3906a5800ef0008470001";

  const props = await getPageProps(id);

  return {
    props,
  };
}

export default KommZuUns;
