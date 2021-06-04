import Image from "next/image";
import React from "react";

export interface VeganProps {
  size?: number;
}

export interface AstarixLogoProps {
  color: "red" | "gray" | "black";
  size?: number;
}

function Astarix({ color, size }: AstarixLogoProps) {
  const ratio = 31 / 100;
  // size = width
  const width = size || 100;
  const height = width * ratio;
  const sources = {
    red: "https://images.ctfassets.net/7hyqdl211gwx/37z5swgbalZgTlrm4feYtF/8747c027c3523be175bd9a1ad2b2441b/Astarix_Logo_Rot.png",
    gray: "https://images.ctfassets.net/7hyqdl211gwx/37z5swgbalZgTlrm4feYtF/8747c027c3523be175bd9a1ad2b2441b/Astarix_Logo_Grau.png",
    black:
      "https://images.ctfassets.net/7hyqdl211gwx/37z5swgbalZgTlrm4feYtF/8747c027c3523be175bd9a1ad2b2441b/Astarix_Logo_Schwarz.png",
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

function Vegan({ size }: VeganProps) {
  const ratio = 127 / 112;
  // size = width
  const width = size || 112;
  const height = width * ratio;
  return (
    <Image
      src="https://images.ctfassets.net/7hyqdl211gwx/77kTk0GdFQiZO78nW0gdE3/69efb4102c3188b4af8fa1e3d600124c/3eb54970-afe2-11eb-bd86-3988be5a9e1c-Vegan-Symbol.png"
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
