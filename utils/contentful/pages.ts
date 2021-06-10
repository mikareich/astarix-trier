import { Document } from "@contentful/rich-text-types";
import { Asset, Entry } from "contentful";

import { Metadata, Page, Route } from "../../interfaces";
import { client, previewClient } from "./clients";

interface PageModel {
  slug: string;
  title: string;
  heroImage: Asset;
  content: Document;
}

function parseEntryToPage(entry: Entry<PageModel>): Page {
  const { title, heroImage, content, slug } = entry.fields;
  const { id } = entry.sys;

  const page: Page = {
    id,
    slug: slug || "",
    title,
    heroImage: {
      url:
        (heroImage?.fields?.file?.url &&
          `https:${heroImage?.fields?.file?.url}`) ||
        "",
      description: heroImage?.fields?.description || "",
    },
    content,
  };

  return page;
}

export async function getPageBySlug(
  slug: string,
  preview = false
): Promise<Page> {
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

function parsePageToRoute({ slug, title, id }: Page): Route {
  return {
    slug,
    title,
    id,
    leading: id === "7qFU0oIrQlFr5R2tORmyFQ",
  };
}

export async function getMetadata(): Promise<Metadata> {
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

export async function getAllPageRoutes(): Promise<Route[]> {
  const data = await client.getEntries<PageModel>({
    content_type: "page",
  });

  const routes: Route[] = data.items
    .map(parseEntryToPage)
    .map(parsePageToRoute);

  return routes;
}
