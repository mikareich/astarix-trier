import { atom } from "recoil";

import { ICategory, ICosmicImage } from "../interfaces";

export const drawerState = atom({
  key: "drawerState",
  default: false,
});

export const titleState = atom({
  key: "titleState",
  default: "Astarix Trier",
});

export const descriptionState = atom({
  key: "descriptionState",
  default: "",
});

export const heroState = atom<ICosmicImage>({
  key: "heroState",
  default: undefined,
});
