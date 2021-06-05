import { useRecoilState } from "recoil";

import { PageProps } from "../../interfaces";
import {
  descriptionState,
  favIconState,
  footbarRoutesState,
  heroState,
  navbarRoutesState,
  titleState,
} from "./atoms";

export default function updateAppContext({
  title,
  heroImage,
  metaDescription,
  favIcon,
  navbarRoutes,
  footbarRoutes,
}: PageProps) {
  const [, setTitle] = useRecoilState(titleState);
  const [, setDescription] = useRecoilState(descriptionState);
  const [, setFavIcon] = useRecoilState(favIconState);
  const [, setHeroImage] = useRecoilState(heroState);
  const [, setNavbarRoutes] = useRecoilState(navbarRoutesState);
  const [, setFootbarRoutes] = useRecoilState(footbarRoutesState);

  setTitle(`Astarix Trier | ${title}`);
  setDescription(metaDescription);
  setFavIcon(favIcon);
  setHeroImage(heroImage);
  setNavbarRoutes(navbarRoutes);
  setFootbarRoutes(footbarRoutes);
}
