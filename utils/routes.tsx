import React from "react";

import Logo from "../components/Logo";
import { IRoute } from "../interfaces";

const routes: IRoute[] = [
  {
    id: "60af8252312d790009aaabb7",
    slug: "/",
    title: <Logo.Astarix color="red" />,
  },
  {
    id: "60b379c1f6a02000084be7b7",
    slug: "/karte",
    title: "Karte",
  },
  {
    id: "60b3906a5800ef0008470001",
    slug: "/komm-zu-uns",
    title: "Komm zu uns",
  },
  {
    id: "60b390cab11c22000757f6b8",
    slug: "/impressum",
    title: "Impressum",
  },
  {
    id: "60b391002544e00008dca204",
    slug: "/datenschutzerklaerung",
    title: "Datenschutzerklärung",
  },
];

export const navBarRoutes: IRoute[] = [
  { ...routes[0], leading: true },
  routes[1],
  routes[2],
];

export const footerRoutes: IRoute[] = [
  { ...routes[0], leading: true, title: <Logo.Astarix color="gray" /> },
  routes[3],
  routes[4],
];

export const drawerRoutes: IRoute[] = [
  { ...routes[0], leading: true },
  routes[1],
  routes[2],
  routes[3],
  routes[4],
];

export default routes;
