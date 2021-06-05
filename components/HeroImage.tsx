import Image from "next/image";
import React from "react";
import { Parallax } from "react-scroll-parallax";

import heroImageStyles from "../styles/HeroImage.module.scss";
import layoutStyles from "../styles/Layout.module.scss";

interface HeroImageProps {
  src: string;
  description: string;
}

function HeroImage({ src, description }: HeroImageProps) {
  const yOffset = [-30, 30];
  return (
    <Parallax
      className={`${layoutStyles.hero} ${heroImageStyles.container}`}
      y={yOffset}
    >
      <Image
        className={heroImageStyles.heroImage}
        src={src}
        alt={description}
        layout="fill"
      />
    </Parallax>
  );
}

export default HeroImage;
