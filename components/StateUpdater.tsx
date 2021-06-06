import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { PageProps } from "../interfaces";
import {
  descriptionState,
  favIconState,
  footbarRoutesState,
  heroState,
  navbarRoutesState,
  previewState,
  titleState,
} from "../utils/atoms";

function StateUpdater({
  title,
  heroImage,
  metaDescription,
  favIcon,
  navbarRoutes,
  footbarRoutes,
  preview,
}: PageProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setFavIcon] = useRecoilState(favIconState);
  const [, setHeroImage] = useRecoilState(heroState);
  const [, setNavbarRoutes] = useRecoilState(navbarRoutesState);
  const [, setFootbarRoutes] = useRecoilState(footbarRoutesState);
  const [, setPreview] = useRecoilState(previewState);

  useEffect(() => {
    setTitle(`Astarix Trier | ${title}`);
    setDescription(metaDescription);
    setFavIcon(favIcon);
    setHeroImage(heroImage);
    setNavbarRoutes(navbarRoutes);
    setFootbarRoutes(footbarRoutes);
    setPreview(preview);
  }, []);

  return null;
}

export default StateUpdater;
