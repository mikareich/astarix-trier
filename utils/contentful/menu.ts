import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";

import { ICategory, IProduct } from "../../interfaces";
import { client } from "./clients";

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

export default async function getMenu(): Promise<ICategory[]> {
  const data = await client.getEntries<CollectionModel>({
    content_type: "collection",
    order: "sys.createdAt",
  });

  const menu: ICategory[] = data.items.map(parseCategory);

  return menu;
}
