import Image from "next/image";
import React from "react";
import { Parallax } from "react-scroll-parallax";

import { IHeroImageProps } from "../interfaces";
import heroImageStyles from "../styles/HeroImage.module.scss";
import layoutStyles from "../styles/Layout.module.scss";

function HeroImage({ src, alt }: IHeroImageProps) {
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
