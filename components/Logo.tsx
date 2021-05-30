import Image from "next/image";
import React from "react";

interface AstarixLogoProps {
  color: "red" | "gray" | "black";
  size?: number;
}

function Astarix({ color, size }: AstarixLogoProps) {
  const ratio = 31 / 100;
  // size = width
  const width = size || 100;
  const height = width * ratio;
  const sources = {
    red: "https://imgix.cosmicjs.com/ec629b00-b56d-11eb-b5b6-fd115d17c053-Astarix-Logo.png",
    gray: "https://imgix.cosmicjs.com/e717c710-b56d-11eb-b5b6-fd115d17c053-Astarix-Logo-Grau.png",
    black:
      "https://imgix.cosmicjs.com/e6fb6570-b56d-11eb-b5b6-fd115d17c053-Astarix-Logo-Black.png",
  };

  const src = sources[color];

  return (
    <Image
      src={src}
      alt="Astarix Logo"
      layout="fixed"
      width={width}
      height={height}
    />
  );
}

interface VeganProps {
  size?: number;
}

function Vegan({ size }: VeganProps) {
  const ratio = 127 / 112;
  // size = width
  const width = size || 112;
  const height = width * ratio;
  return (
    <Image
      src="https://imgix.cosmicjs.com/3eb54970-afe2-11eb-bd86-3988be5a9e1c-Vegan-Symbol.png"
      layout="fixed"
      width={width}
      height={height}
      alt="Vegan Logo"
    />
  );
}

const Logo = {
  Vegan,
  Astarix,
};

export default Logo;
