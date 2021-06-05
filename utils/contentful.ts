import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Block, BLOCKS, Document } from "@contentful/rich-text-types";
import { Asset, createClient, Entry } from "contentful";

import { ICategory, IMetadata, IPage, IProduct } from "../interfaces";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CDA_ACCESS_TOKEN,
});

export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CPA_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

interface PageModel {
  slug: string;
  title: string;
  heroImage: Asset;
  content: Document;
}

function parseEntryToPage(entry: Entry<PageModel>): IPage {
  const { title, heroImage, content, slug } = entry.fields;
  const { id } = entry.sys;

  console.log(content);

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
          `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
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
}

export async function getMetadata(): Promise<IMetadata> {
  const data = await client.getEntry<AppModel>("4aS9BmUxul6TfbSHx5qYbf", {
    content_type: "app",
    select: "fields.favIcon,fields.metaDescription",
  });

  const { fields } = data;

  return {
    favIcon: {
      url: `https://${fields.favIcon.fields.file.url}`,
      description: fields.favIcon.fields.description,
    },
    metaDescription: fields.metaDescription,
  };
}

interface CollectionModel {
  title: string;
  note: Document;
  products: Entry<ProductModel>[];
}

interface ProductModel {
  title: string;
  description: Document;
  vegan: boolean;
  variants: { id: string; key: string; value: string }[];
  price: number;
}

function parseCategory(categoryEntry: Entry<CollectionModel>): ICategory {
  const { fields, sys } = categoryEntry;

  return {
    id: sys.id,
    title: fields.title,
    note: documentToHtmlString(fields?.note),
    products: fields.products.map(parseProduct),
  };
}

function parseProduct(productEntry: Entry<ProductModel>): IProduct {
  const { fields, sys } = productEntry;

  return {
    id: sys.id,
    title: fields.title,
    description: documentToHtmlString(fields?.description),
    price: fields.price,
    vegan: fields.vegan,
    variants:
      fields?.variants?.map(({ key, value, id }) => ({
        variant: key,
        id,
        price: value,
      })) || [],
  };
}

export async function getMenu(): Promise<ICategory[]> {
  const data = await client.getEntries<CollectionModel>({
    content_type: "collection",
    order: "sys.createdAt",
  });

  const menu: ICategory[] = data.items.map(parseCategory);

  return menu;
}
