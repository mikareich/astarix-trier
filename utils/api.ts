import Cosmic from "cosmicjs";

import { ICategory, IPageProps, IProduct } from "../interfaces";
import markdownToHTML from "./markdownToHTML";
import routes from "./routes";

const api = Cosmic();

const bucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ_KEY,
});

export async function getIndexDescription(): Promise<string> {
  const { id } = routes[0];
  const props = "metadata.description";

  const data = await bucket.getObject({ id, props });

  return data.object.metadata.description;
}

export async function getPageProps(pageId: string): Promise<IPageProps> {
  const props = "title,metadata";

  const data = await bucket.getObject({
    id: pageId,
    props,
  });

  const { title } = data.object;
  const { hero, content, description } = data.object.metadata;

  return {
    title,
    heroImage: hero,
    content: await markdownToHTML(content),
    description: description || (await getIndexDescription()),
  };
}

export async function getMenu(): Promise<ICategory[]> {
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
