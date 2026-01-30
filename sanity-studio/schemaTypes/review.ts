import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stars",
      title: "Aantal sterren (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).required(),
    }),
    defineField({
      name: "text",
      title: "Review tekst",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
