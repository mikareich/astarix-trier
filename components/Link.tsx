import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import linkStyles from "../styles/Link.module.scss";

interface LinkProps {
  active?: boolean;
}

function Link({
  active,
  href,
  children,
  className,
  ...props
}: LinkProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) {
  const [isActive, setActive] = useState(active);

  useEffect(() => {
    const url = new URL(window.location.href);
    setActive(url.pathname === href || active);
  });

  return (
    <NextLink href={href} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className={`${linkStyles.link} ${
          isActive ? linkStyles.active : linkStyles.inactive
        } ${className}`}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
