import Cosmic from "cosmicjs";

import { ICategory, IProduct } from "../interfaces";
import markdownToHTML from "./markdownToHTML";

export const api = Cosmic();

export const bucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ_KEY,
});

export async function getObject(id: string, props: string = undefined) {
  const data = await bucket.getObject({
    id,
    props,
  });

  return data?.object;
}

export async function getPageProps(pageId: string) {
  const props = "title,metadata";

  const { title, metadata } = await getObject(pageId, props);
  const { hero, content } = metadata;

  return {
    title,
    heroImage: hero,
    content: await markdownToHTML(content),
  };
}

export async function getMenu() {
  const props =
    "title,id,metadata.note,metadata.products.title,metadata.products.id,metadata.products.metadata";

  const query = {
    type: "category",
  };

  const sort = "created_at";

  const categories = await bucket.getObjects({
    query,
    props,
    sort,
  });

  // parse categories
  const parseProduct = (product): IProduct => ({
    title: product.title,
    vegan: product?.metadata?.vegan || false,
    description: product?.metadata?.description || "",
    price: Number(product?.metadata?.price) || null,
    variants: product?.metadata?.variants || [],
    id: product.id,
  });

  const parseCategory = (category): ICategory => ({
    title: category.title,
    note: category.metadata?.note || "",
    products: category.metadata?.products?.map(parseProduct) || [],
    id: category.id,
  });

  const parsedCategories: ICategory[] = categories.objects.map(parseCategory);

  return parsedCategories;
}
