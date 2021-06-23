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

/**
 * Parse entry to page
 * @param entry Page entry
 * @returns Parsed page
 */
function parsePage(entry: Entry<PageModel>): Page {
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

/**
 *
 * @param slug Slug of page
 * @param preview Preview-mode
 * @returns Page
 */
export async function getPage(slug: string, preview = false): Promise<Page> {
  const query = { content_type: "page", select: "sys.id,fields" };

  if (slug) {
    query["fields.slug[match]"] = slug;
  } else {
    query["sys.id[match]"] = "7qFU0oIrQlFr5R2tORmyFQ";
  }

  const data = await (preview ? previewClient : client).getEntries<PageModel>(
    query
  );

  const page = parsePage(data.items[0]);

  return page;
}

interface AppModel {
  favIcon: Asset;
  metaDescription: string;
  navbar: Entry<PageModel>[];
  footbar: Entry<PageModel>[];
}

/**
 * Parses page to route
 * @param page Page of route
 * @returns Route
 */
function parseRoute({ slug, title, id }: Page): Route {
  return {
    slug,
    title,
    id,
    leading: id === "7qFU0oIrQlFr5R2tORmyFQ",
  };
}

/**
 * Fetches and returns metadata of app
 * @returns Metadata
 */
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
    navbarRoutes: fields.navbar.map(parsePage).map(parseRoute),
    footbarRoutes: fields.footbar.map(parsePage).map(parseRoute),
  };
}

/**
 * Fetches and returns all page routes
 * @returns All routes
 */
export async function getAllPageRoutes(): Promise<Route[]> {
  const data = await client.getEntries<PageModel>({
    content_type: "page",
  });

  const routes: Route[] = data.items.map(parsePage).map(parseRoute);

  return routes;
}
