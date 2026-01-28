import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Dienst",
  type: "document",
  fields: [
    defineField({
      name: "serviceId",
      title: "Service ID (HTML anchor)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    // ✅ NIEUW: korte tekst voor de cards op de homepagina (Aanbod-overzicht)
    defineField({
      name: "cardText",
      title: "Korte tekst (aanbod overzicht)",
      type: "string",
      description: "1–2 zinnen die op de kaartjes op de homepagina verschijnen.",
    }),

    defineField({ name: "price", title: "Prijs", type: "string" }),
    defineField({ name: "duration", title: "Duur", type: "string" }),

    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "sideTitle",
      title: "Sidebar titel",
      type: "string",
    }),

    defineField({
      name: "sideText",
      title: "Sidebar tekst",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "sideTitle2",
      title: "Sidebar titel 2",
      type: "string",
    }),

    defineField({
      name: "sideText2",
      title: "Sidebar tekst 2",
      type: "text",
      rows: 3,
    }),
  ],
});

// 👇 dit is BELANGRIJK
export default service;
