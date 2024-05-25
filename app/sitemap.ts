import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://easyarty.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://easyarty.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://easyarty.com/blog/artillery",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
