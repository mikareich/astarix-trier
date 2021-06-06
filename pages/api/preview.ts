import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  // Calling setPreviewData sets a preview cookies that turn on the preview mode.
  // Any requests to Next.js containing these cookies will be seen as preview mode,
  // and the behavior for statically generated pages will change.
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  });
  const { slug } = req.query;
  res.redirect(`/${slug === "home" ? "" : slug}`);
  res.end();
}

export default handler;
