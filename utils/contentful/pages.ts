import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { Asset, Entry } from "contentful";

import { IMetadata, IPage, IRoute } from "../../interfaces";
import { client, previewClient } from "./clients";

interface PageModel {
  slug: string;
  title: string;
  heroImage: Asset;
  content: Document;
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
        [BLOCKS.EMBEDDED_ASSET]: ({
          data: {
            target: { fields },
          },
        }) =>
          `<img src="${fields.file.url}" loading="lazy" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
      },
    }),
  };

  return page;
}

export async function getPage(slug: string, preview = false): Promise<IPage> {
  const data = await (preview ? previewClient : client).getEntries<PageModel>({
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
  navbar: Entry<PageModel>[];
  footbar: Entry<PageModel>[];
}

function parsePageToRoute({ slug, title, id }: IPage): IRoute {
  return {
    slug: slug === "home" ? "" : slug,
    title,
    id,
    leading: slug === "home",
  };
}

export async function getMetadata(): Promise<IMetadata> {
  const data = await client.getEntry<AppModel>("4aS9BmUxul6TfbSHx5qYbf", {
    content_type: "app",
    select: "fields",
  });

  const { fields } = data;

  return {
    favIcon: {
      url: `https://${fields.favIcon.fields.file.url}`,
      description: fields.favIcon.fields.description,
    },
    metaDescription: fields.metaDescription,
    navbarRoutes: fields.navbar.map(parseEntryToPage).map(parsePageToRoute),
    footbarRoutes: fields.footbar.map(parseEntryToPage).map(parsePageToRoute),
  };
}

export async function getAllPageRoutes(): Promise<IRoute[]> {
  const data = await client.getEntries<PageModel>({
    content_type: "page",
  });

  const routes: IRoute[] = data.items
    .map(parseEntryToPage)
    .map(parsePageToRoute);

  return routes;
}
