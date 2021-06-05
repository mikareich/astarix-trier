import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Clears the preview mode cookies.
  res.clearPreviewData();
  res.redirect("/");
  res.end();
};
