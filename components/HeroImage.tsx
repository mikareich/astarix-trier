import React from "react";
import { Parallax } from "react-scroll-parallax";
import Image from "next/image";
import { HeroImageProps } from "../interfaces";

import layoutStyles from "../styles/Layout.module.scss";
import heroImageStyles from "../styles/HeroImage.module.scss";

function HeroImage({ src, alt }: HeroImageProps) {
  const yOffset = [-50, 50];
  return (
    <Parallax
      className={`${layoutStyles.hero} ${heroImageStyles.container}`}
      y={yOffset}
    >
      <Image
        className={heroImageStyles.heroImage}
        src={src}
        alt={alt}
        layout="fill"
      />
    </Parallax>
  );
}

export default HeroImage;
