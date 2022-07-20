import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "xq9vji9e",

  //dataset to know if we are in production or development
  dataset: "production",

  apiVersion: "2022-07-20",

  useCdn: true,

  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

//to use the sanity images
const builder = ImageUrlBuilder(client);

//to get the urls for the images stored in sanity
export const urlFor = (source) => builder.image(source);
