import React from "react";

import Logo from "../components/Logo";

export const navBarRoutes = [
  {
    title: <Logo.Astarix color="red" />,
    pathname: "/",
    leading: true,
  },
  { title: "Karte", pathname: "/karte" },
  { title: "Komm zu uns", pathname: "/komm-zu-uns" },
];

export const footerRoutes = [
  {
    title: <Logo.Astarix color="gray" />,
    pathname: "/",
    leading: true,
  },
  { title: "Impressum", pathname: "/impressum" },
  { title: "Datenschutzerklärung", pathname: "/datenschutzerklaerung" },
];

export const drawerRoutes = [
  {
    title: <Logo.Astarix color="red" />,
    pathname: "/",
  },
  { title: "Karte", pathname: "/karte" },
  { title: "Komm zu uns", pathname: "/komm-zu-uns" },
  { title: "Impressum", pathname: "/impressum" },
  { title: "Datenschutzerklärung", pathname: "/datenschutzerklaerung" },
];
