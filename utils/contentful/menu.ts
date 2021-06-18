import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";

import { Category, Product } from "../../interfaces";
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

/**
 * Parses entry to category
 * @param categoryEntry Category entry
 * @returns Parsed category
 */
function parseCategory(categoryEntry: Entry<CollectionModel>): Category {
  const { fields, sys } = categoryEntry;

  return {
    id: sys.id,
    title: fields.title,
    note: documentToHtmlString(fields?.note),
    products: fields.products.map(parseProduct),
  };
}

/**
 * Parses entry to product
 * @param productEntry Product entry
 * @returns Parsed product
 */
function parseProduct(productEntry: Entry<ProductModel>): Product {
  const { fields, sys } = productEntry;

  return {
    id: sys.id,
    title: fields.title,
    description: documentToHtmlString(fields?.description),
    price: fields.price,
    vegan: fields.vegan,
    variants:
      // parse variant entry to variant
      fields?.variants?.map(({ key, value, id }) => ({
        variant: key,
        id,
        price: value,
      })) || [],
  };
}

/**
 * Fetches and parses menu from cms
 * @returns Menu
 */
export default async function getMenu(): Promise<Category[]> {
  const data = await client.getEntries<CollectionModel>({
    content_type: "collection",
    order: "sys.createdAt",
  });

  const menu: Category[] = data.items.map(parseCategory);

  return menu;
}
