import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    venues: z.array(z.string()).default([]),
    tagline: z.string(),
    era: z.enum(["delft", "vida"]),
    order: z.number(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    venueShort: z.string(),
    year: z.number(),
    location: z.string().optional(),
    url: z.string().url().optional(),
    note: z.string().optional(),
  }),
});

const news = defineCollection({
  type: "data",
  schema: z.object({
    date: z.string(),
    label: z.string(),
    html: z.string(),
  }),
});

export const collections = { projects, publications, news };
