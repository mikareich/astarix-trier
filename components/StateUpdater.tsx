import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { PageProps, Route } from "../interfaces";
import {
  footbarRoutesState,
  navbarRoutesState,
  previewState,
} from "../utils/atoms";

interface StateUpdaterProps {
  navbarRoutes: Route[];
  footbarRoutes: Route[];
  preview: boolean;
}

function StateUpdater({
  navbarRoutes,
  footbarRoutes,
  preview,
}: StateUpdaterProps) {
  const [, setNavbarRoutes] = useRecoilState(navbarRoutesState);
  const [, setFootbarRoutes] = useRecoilState(footbarRoutesState);
  const [, setPreview] = useRecoilState(previewState);

  useEffect(() => {
    setNavbarRoutes(navbarRoutes);
    setFootbarRoutes(footbarRoutes);
    setPreview(preview);
  });

  return null;
}

export default StateUpdater;
