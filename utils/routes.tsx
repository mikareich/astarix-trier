import React from "react";

import Logo from "../components/Logo";
import { IRoute } from "../interfaces";

const routes: IRoute[] = [
  {
    slug: "home",
    title: <Logo.Astarix color="red" />,
  },
  {
    slug: "speisekarte",
    title: "Speisekarte",
  },
  {
    slug: "komm-zu-uns",
    title: "Komm zu uns",
  },
  {
    slug: "impressum",
    title: "Impressum",
  },
  {
    slug: "datenschutzerklaerung",
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
