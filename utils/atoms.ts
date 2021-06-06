import { atom } from "recoil";

import { Image, Route } from "../interfaces";

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

export const heroState = atom<Image>({
  key: "heroState",
  default: {
    url: "https://images.ctfassets.net/7hyqdl211gwx/1us3oBtBtQkWaeM2Jev4jx/1b84f318083bec97ecdee7fa7a74f8fb/image",
    description: "Links: Ausenbereich des Astarix; Rechts: Todo-Liste",
  },
});

export const favIconState = atom<Image>({
  key: "favIconState",
  default: {
    url: "https://assets.ctfassets.net/7hyqdl211gwx/w5PX3REw0YsFSJ2LKCRef/0c10761f195bc42824e20258a6692bab/astarix-x.ico",
    description: "Astarix X",
  },
});

export const navbarRoutesState = atom<Route[]>({
  key: "navbarRoutesState",
  default: [],
});

export const footbarRoutesState = atom<Route[]>({
  key: "footbarRoutesState",
  default: [],
});

export const previewState = atom<boolean>({
  key: "previewState",
  default: false,
});
