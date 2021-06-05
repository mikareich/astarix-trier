import { NextApiRequest, NextApiResponse } from "next";

import { getMenu } from "../../utils/contentful";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json(await getMenu());
}

export default handler;
