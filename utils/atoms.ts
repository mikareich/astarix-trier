import { atom } from "recoil";

import { Category, CosmicImage } from "../interfaces";

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

export const menuState = atom<Category[]>({
  key: "menuState",
  default: [],
});

export const heroState = atom<CosmicImage>({
  key: "heroState",
  default: undefined,
});
