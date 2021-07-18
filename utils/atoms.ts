import { atom } from "recoil";

import { Route } from "../interfaces";

export const drawerState = atom({
  key: "drawerState",
  default: false,
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
