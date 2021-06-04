import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Asset, createClient, Entry } from "contentful";

import { IImage, IMetadata, IPage, IRoute } from "../interfaces";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CDA_ACCESS_TOKEN,
});

export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CPA_ACCESS_TOKEN,
});

interface PageModel {
  slug: string;
  title: string;
  heroImage: Asset;
  content: any;
}

function parseEntryToPage(entry: Entry<PageModel>): IPage {
  const { title, heroImage, content, slug } = entry.fields;
  const { id } = entry.sys;

  const page: IPage = {
    id,
    slug,
    title,
    heroImage: {
      url: `https:${heroImage.fields.file.url}`,
      description: heroImage.fields.description,
    },
    content: documentToHtmlString(content, {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, next) =>
          // @ts-ignore
          node.content[0].value[0] === "<"
            ? // @ts-ignore
              node.content[0].value
            : `<p>${next(node.content)}</p>`,
      },
    }),
  };

  return page;
}

export async function getPage(slug: string): Promise<IPage> {
  const data = await client.getEntries<PageModel>({
    content_type: "page",
    "fields.slug[match]": slug,
    select: "sys.id,fields",
  });

  const page = parseEntryToPage(data.items[0]);

  return page;
}

interface AppModel {
  favIcon: Asset;
  metaDescription: string;
}

export async function getMetadata(): Promise<IMetadata> {
  const data = await client.getEntry<AppModel>("4aS9BmUxul6TfbSHx5qYbf", {
    content_type: "app",
    select: "fields.favIcon,fields.metaDescription",
  });

  const { fields } = data;

  console.log({
    favIcon: {
      url: fields.favIcon.fields.file.url,
      description: fields.favIcon.fields.description,
    },
    metaDescription: fields.metaDescription,
  });

  return {
    favIcon: {
      url: fields.favIcon.fields.file.url,
      description: fields.favIcon.fields.description,
    },
    metaDescription: fields.metaDescription,
  };
}
