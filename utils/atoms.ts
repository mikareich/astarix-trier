import { atom } from "recoil";

import { ICategory, ICosmicImage, IImage } from "../interfaces";

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

export const heroState = atom<IImage>({
  key: "heroState",
  default: {
    url: "https://images.ctfassets.net/7hyqdl211gwx/1us3oBtBtQkWaeM2Jev4jx/1b84f318083bec97ecdee7fa7a74f8fb/image",
    description: "Links: Ausenbereich des Astarix; Rechts: Todo-Liste",
  },
});
